import express from 'express';
import { routes } from './routes';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';

const api = express();

api.use('/api/', routes);
api.use(errorHandlerMiddleware);

export { api };
