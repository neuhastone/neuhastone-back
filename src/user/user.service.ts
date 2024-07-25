import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    email: string,
    password: string,
    name: string,
    nickname: string,
  ): Promise<User> {
    const newUser = new User({
      email,
      password,
      name,
      nickname,
    });

    await this.userRepository.insert(newUser);

    return newUser;
  }
}
