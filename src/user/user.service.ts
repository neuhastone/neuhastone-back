import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  saltOrRounds: number = 10;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    email: string,
    password: string,
    name: string,
    nickname: string,
  ): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(
      password,
      this.saltOrRounds,
    );
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      nickname,
    });

    await this.userRepository.insert(newUser);

    return newUser;
  }

  async getUser(email: string): Promise<User> {
    const existedUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!existedUser) throw new NotFoundException();

    return existedUser;
  }
}
