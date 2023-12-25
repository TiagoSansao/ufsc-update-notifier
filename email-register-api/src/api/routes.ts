import { Router, json, urlencoded } from 'express';

const routes = Router();

routes.use(json());
routes.use(urlencoded({ extended: true }));

routes.post('/email');
routes.delete('/email');

export { routes };
