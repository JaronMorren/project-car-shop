import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
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
  public async getAllMotorcycles() {
    try {
      const motorcycles = await this.service.getAllMotorcycles();
      return this.response.status(200).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycleByID() {
    const { id } = this.request.params;
    try {
      if (!isValidObjectId(id)) {
        return this.response.status(422).json({ message: 'Invalid mongo id' });
      }
      const motorcycle = await this.service.getMotorcycleByID(id);
      if (motorcycle !== null) {
        return this.response.status(200).json(motorcycle);
      }
      return this.response.status(404).json({ message: 'Motorcycle not found' });
    } catch (error) {
      this.next(error);
    }
  }
}
export default MotorcycleController;