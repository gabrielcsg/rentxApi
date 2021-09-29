import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name;
    email;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepostory: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepostory.findByEmail(email);
    if (!user) throw new Error('Email or password incorrect!');

    const passwordMatchs = await compare(password, user.password);

    if (!passwordMatchs) throw new Error('Email or password incorrect!');

    const token = sign({}, 'd652eeeea9a382e2b37ad73e0a66b131', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user: { name: user.name, email: user.email }, token };
  }
}

export { AuthenticateUserUseCase };
