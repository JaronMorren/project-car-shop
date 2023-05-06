import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private request: Request;
  private response: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request;
    this.response = response;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async createMotorcycle() {
    const motorcycle: IMotorcycle = this.request.body;
    try {
      const newMotorcycle = await this.service.createMotorcycle(motorcycle);
      return this.response.status(201).json(newMotorcycle);
    } catch (error) {
      return this.next(error);
    }
  }
}
export default MotorcycleController;