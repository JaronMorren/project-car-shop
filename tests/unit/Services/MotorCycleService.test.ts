import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMoto from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const honda = 'Honda Cb 600f Hornet';
const yamaha = 'Yamaha YZF-R3';
describe('Test the Motorcycle Service layer', function () {
  it('if a new motorcycle is successfully created', async function () {
    // Arrange
    const request: IMoto = {
      id: '645997a6e15e28e4a5ddfad3',
      model: honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    };
    const response: IMoto = {
      id: '645997a6e15e28e4a5ddfad3',
      model: honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    };
    sinon.stub(Model, 'create').resolves(response);
    // Act
    const service = new MotorcycleService();
    const result = await service.createMotorcycle(request);
    // Assert
    expect(result).to.be.deep.equal(response);
  });
  it('if all motorcycles are successfully listed', async function () {
    // Arrange
    const motorcyclesArray = [
      {
        id: '645997a6e15e28e4a5ddfad3',
        model: honda,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      
      {
        id: '6459a745e15e28e4a5ddfad5',
        model: yamaha,
        year: 2015,
        color: 'Red',
        status: true,
        buyValue: 20000,
        category: 'Street',
        engineCapacity: 321,
      },
    ];
    sinon.stub(Model, 'find').resolves(motorcyclesArray);
    // Act
    const service = new MotorcycleService();
    const result = await service.getAllMotorcycles();
    // Assert
    expect(result).to.be.deep.equal(motorcyclesArray);
  });
  it('if a motorcycle is correctly displayed when requested with a valid ID ', async function () {
    // Arrange
    const motorcycle = {
      id: '645997a6e15e28e4a5ddfad3',
      model: honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    };
    sinon.stub(Model, 'findById').resolves(motorcycle);
    // Act
    const service = new MotorcycleService();
    const motoId = await service.getMotorcycleByID('645997a6e15e28e4a5ddfad3');
    // Assert
    expect(motoId).to.be.deep.equal(motorcycle);
  });
  it('if an error is thrown when an invalid ID is requested', async function () {
    // Arrange
    const invalidID = 999;
    const badRequest = {
      id: invalidID,
      model: yamaha,
      year: 2015,
      color: 'Red',
      status: true,
      buyValue: 20000,
      category: 'Street',
      engineCapacity: 321,
    };
    sinon.stub(Model, 'findById').resolves(badRequest);
    try {
      // Act
      const service = new MotorcycleService();
      await service.getMotorcycleByID('INVALID_MONGO_ID');
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.deep.equal('Invalid mongo id');
    }
  });
  it('if a motorcycle can be successfully edited', async function () {
    // Arrange
    const request: IMoto = {
      id: '6459a745e15e28e4a5ddfad5',
      model: yamaha,
      year: 2015,
      color: 'Orange',
      status: true,
      buyValue: 20000,
      category: 'Street',
      engineCapacity: 321,
    };
    const response: IMoto = {
      id: '6459a745e15e28e4a5ddfad5',
      model: yamaha,
      year: 2015,
      color: 'Orange',
      status: true,
      buyValue: 20000,
      category: 'Street',
      engineCapacity: 321,
    };
    sinon.stub(Model, 'findByIdAndUpdate').resolves(response);
    // Act
    const service = new MotorcycleService();
    const result = await service.updateMotorcycle('6459a745e15e28e4a5ddfad5', request);
    // Assert
    expect(result).to.be.deep.equal(response);
  });
  afterEach(function () {
    sinon.restore();
  });
});