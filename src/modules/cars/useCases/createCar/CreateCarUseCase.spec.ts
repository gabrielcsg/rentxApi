import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Name car',
        description: 'description car',
        daily_rate: 100,
        license_plate: 'ABC1234',
        fine_amount: 60,
        brand: 'brand car',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Name car 2',
        description: 'description car 2',
        daily_rate: 100,
        license_plate: 'ABC1234',
        fine_amount: 60,
        brand: 'brand car 2',
        category_id: 'category 2',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with avaiable true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car avaiable',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'CDD1234',
      fine_amount: 60,
      brand: 'brand car',
      category_id: 'category',
    });

    expect(car.avaiable).toBe(true);
  });
});
