import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }
  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.createVehicle(car);
    return this.createCarDomain(newCar);
  }
  public async getAllCars() {
    const carODM = new CarODM();
    const cars = await carODM.getAllVehicles();
    const carDomain = cars.map((car) => { 
      const newCar = new Car(car);
      return newCar;
    });
    return carDomain;
  }
  public async getCarByID(id: string) {
    const carODM = new CarODM();
    const car = await carODM.getVehicleByID(id);
    if (car) {
      return new Car(car);
    }
    return null;
  }
  public async updateCar(id: string, car: ICar): Promise <Car | null> {
    const carODM = new CarODM();
    const updatedCar = await carODM.updateVehicle(id, car);
    return this.createCarDomain(updatedCar);
  }
}
export default CarService;