import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '../../errors/application';

function errorHandlerMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (!(error instanceof ApplicationError)) {
    console.error(error);

    res.status(500).json({ error: 'Internal server error.' });
    return;
  }

  if (error.statusCode === 500) {
    console.error(error);

    res.status(500).json({ error: 'Internal server error.' });
    return;
  }

  res.status(error.statusCode).json({ error: error.message });
}

export { errorHandlerMiddleware };
