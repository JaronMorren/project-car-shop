import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private _category: 'Street' | 'Custom' | 'Trail';
  private _engineCapacity: number;

  constructor(motorcycle : IMotorcycle) {
    super(motorcycle);
    this._category = motorcycle.category;
    this._engineCapacity = motorcycle.engineCapacity;
  }
}

export default Motorcycle;