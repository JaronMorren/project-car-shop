import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRouter = Router();

carRouter.post(
  '/', 
  (request, response, next) => new CarController(request, response, next).createCar(),
);

export default carRouter;