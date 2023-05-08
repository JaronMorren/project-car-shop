import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Test the CarService layer', function () {
  it('if a new car can be created successfully', async function () {
    // Arrange
    const request: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const response: ICar = {
      id: '64597323e15e28e4a5ddfacc',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'create').resolves(response);
    // Act
    const service = new CarService();
    const result = await service.createCar(request);
    // Assert
    expect(result).to.be.deep.equal(response);
  });
  it('if all cars are listed successfully', async function () {
    // Arrange
    const carsArray = [
      {
        id: '64597323e15e28e4a5ddfacc',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '645975c8e15e28e4a5ddfacf',
        model: 'A3',
        year: 2003,
        color: 'Yellow',
        status: true,
        buyValue: 20000,
        doorsQty: 5,
        seatsQty: 5,
      },
    ];
    sinon.stub(Model, 'find').resolves(carsArray);
    // Act
    const service = new CarService();
    const result = await service.getAllCars();
    // Assert
    expect(result).to.be.deep.equal(carsArray);
  });
  it('if a car is correctly displayed when its ID is requested', async function () {
    // Arrange
    const response = {
      id: '64597323e15e28e4a5ddfacc',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'findById').resolves(response);
    // Act
    const service = new CarService();
    const carID = await service.getCarByID('64597323e15e28e4a5ddfacc');
    // Assert
    expect(carID).to.be.deep.equal(response);
  });
  it('if an error is thrown when an invalid ID is requested', async function () {
    // Arrange
    const invalidID = 999;
    const badRequest = {
      id: invalidID,
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'findById').resolves(badRequest);
    try {
      // Act
      const service = new CarService();
      await service.getCarByID('INVALID_MONGO_ID');
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.deep.equal('Invalid mongo id');
    }
  });
  it('if a car can be edited successfully', async function () {
    // Arrange
    const request: ICar = {
      model: 'A3',
      year: 2004,
      color: 'Blue',
      status: true,
      buyValue: 21000,
      doorsQty: 3,
      seatsQty: 2,
    };
    const response: ICar = {
      id: '645975c8e15e28e4a5ddfacf',
      model: 'A3',
      year: 2004,
      color: 'Blue',
      status: true,
      buyValue: 21000,
      doorsQty: 3,
      seatsQty: 2,
    };
    sinon.stub(Model, 'findByIdAndUpdate').resolves(response);
    // Act
    const service = new CarService();
    const result = await service.updateCar('645975c8e15e28e4a5ddfacf', request);
    // Assert
    expect(result).to.be.deep.equal(response);
  });
  afterEach(function () {
    sinon.restore();
  });
});