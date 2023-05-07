import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRouter = Router();

motorcycleRouter.post(
  '/', 
  (request, response, next) => new MotorcycleController(request, response, next).createMotorcycle(),
);
motorcycleRouter.get(
  '/', 
  (request, response, next) => new MotorcycleController(request, response, next).getAllMotorcycles()
  ,
);
motorcycleRouter.get(
  '/:id', 
  (request, response, next) => new MotorcycleController(request, response, next).getMotorcycleByID()
  ,
);
motorcycleRouter.put(
  '/:id', 
  (request, response, next) => new MotorcycleController(request, response, next).updateMotorcycle()
  ,
);
export default motorcycleRouter;
