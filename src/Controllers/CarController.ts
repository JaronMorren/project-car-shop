import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private request: Request;
  private response: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request;
    this.response = response;
    this.next = next;
    this.service = new CarService();
  }

  public async createCar() {
    const car: ICar = this.request.body;
    try {
      const newCar = await this.service.createCar(car);
      return this.response.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }
}
export default CarController;