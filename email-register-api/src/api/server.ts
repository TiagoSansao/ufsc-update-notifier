import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerData from '../../docs/swagger.json';
import { routes } from './routes';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';

const api = express();

api.use(express.static('public'));

api.use('/api/', routes);
api.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerData));
api.use(errorHandlerMiddleware);

export { api };
