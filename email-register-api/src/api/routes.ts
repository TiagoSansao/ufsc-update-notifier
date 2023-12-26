import { Router, json, urlencoded } from 'express';
import { saveEmailEndpoint } from './middlewares/saveEmailEndpoint';
import { deleteEmailEndpoint } from './middlewares/deleteEmailEndpoint';

const routes = Router();

routes.use(json());
routes.use(urlencoded({ extended: true }));

routes.post('/email', saveEmailEndpoint);
routes.delete('/email', deleteEmailEndpoint);

export { routes };
