import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '../../errors/application';
import { logger } from '../../utils/logger';

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
    logger.error(error);

    res.status(500).json({ error: 'Internal server error.' });
    return;
  }

  if (error.statusCode === 500) {
    logger.error(error);

    res.status(500).json({ error: 'Internal server error.' });
    return;
  }

  logger.info(error.message);

  res.status(error.statusCode).json({ error: error.message });
}

export { errorHandlerMiddleware };
