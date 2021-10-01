import { getRepository, Repository } from 'typeorm';
import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
