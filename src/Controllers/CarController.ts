import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
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
  public async getAllCars() {
    try {
      const cars = await this.service.getAllCars();
      return this.response.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getCarByID() {
    const { id } = this.request.params;
    try {
      if (!isValidObjectId(id)) {
        return this.response.status(422).json({ message: 'Invalid mongo id' });
      }
      const car = await this.service.getCarByID(id);
      if (car !== null) {
        return this.response.status(200).json(car);
      }
      return this.response.status(404).json({ message: 'Car not found' });
    } catch (error) {
      this.next(error);
    }
  }
}
export default CarController;