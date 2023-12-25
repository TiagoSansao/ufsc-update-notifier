import express from 'express';
import { routes } from './routes';

const api = express();

api.use('/api/', routes);
// api.use(errorHandlerMiddleware);

export { api };
