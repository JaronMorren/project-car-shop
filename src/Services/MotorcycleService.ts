import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.createVehicle(motorcycle);
    return new Motorcycle(newMotorcycle);
  }
  public async getAllMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.getAllVehicles();
    const motorcycleDomain = motorcycles.map((motorcycle) => { 
      const newMotorcycle = new Motorcycle(motorcycle);
      return newMotorcycle;
    });
    return motorcycleDomain;
  }

  public async getMotorcycleByID(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.getVehicleByID(id);
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }
}
export default MotorcycleService;
