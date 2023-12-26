import { Request, Response } from 'express';
import { ApplicationError } from '../../errors/application';

function errorHandlerMiddleware(error: unknown, _req: Request, res: Response) {
  console.log('caiu no error handler');

  if (!(error instanceof ApplicationError)) {
    console.error(error);

    res.status(500).json({ error: 'Internal server error.' });
    return;
  }
  console.log(error.statusCode);

  if (error.statusCode === 500) {
    console.error(error);

    res.status(500).json({ error: 'Internal server error.' });
    return;
  }

  res.status(error.statusCode).json({ error: error.message });
}

export { errorHandlerMiddleware };
