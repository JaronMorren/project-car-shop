import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRouter = Router();

carRouter.post(
  '/', 
  (request, response, next) => new CarController(request, response, next).createCar(),
);

carRouter.get(
  '/',
  (request, response, next) => new CarController(request, response, next).getAllCars(),
);

carRouter.get(
  '/:id',
  (request, response, next) => new CarController(request, response, next).getCarByID(),
);
export default carRouter;