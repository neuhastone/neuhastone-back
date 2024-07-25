import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateRequestDTO } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userCreateRequestDto: UserCreateRequestDTO) {
    const { email, name, nickname, password } = userCreateRequestDto;
    await this.userSerivce.createUser(email, password, name, nickname);
    return;
  }
}
