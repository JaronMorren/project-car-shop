import { Model, Schema, models,
  model, isValidObjectId } from 'mongoose';
  
abstract class AbstractODM<T> {
  protected model: Model<T>;
  private schema: Schema;
  protected modelName: string;
  
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }
  
  public async createCar(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }
  
  public async getAllCars(): Promise<T[]> {
    return this.model.find();
  }

  public async getCarByID(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error('Invalid mongo id');
    return this.model.findById(id);
  }
}
  
export default AbstractODM;

// https://github.com/tryber/sd-025-b-live-lectures/blob/lecture/back/12.2/trix/src/Models/AbstractODM.ts