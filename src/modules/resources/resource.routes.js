import { Router } from 'express';
//import validate   from 'express-validation';

import { authJwt } from "../../services/auth.services";
import * as resourceController from './resource.controllers';


const routes = new Router();

routes.post('/', authJwt, resourceController.createResource);
routes.get(`/:id`, resourceController.getResourceById);
routes.get(`/`, resourceController.getResourceList);

export default routes;