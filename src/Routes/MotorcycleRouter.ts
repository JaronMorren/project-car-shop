import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRouter = Router();

motorcycleRouter.post(
  '/', 
  (request, response, next) => new MotorcycleController(request, response, next).createMotorcycle(),
);
export default motorcycleRouter;
