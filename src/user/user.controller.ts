import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateRequestDTO } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { SearchUserResponseDTO, UserDTO } from './dto/search-user-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userCreateRequestDto: UserCreateRequestDTO) {
    const { email, name, nickname, password } = userCreateRequestDto;
    await this.userService.createUser(email, password, name, nickname);
    return;
  }

  @Get('/search')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getUsers(@Query('emailSubstring') emailSubstring?: string) {
    const users: User[] =
      await this.userService.findUsersByEmailSubstring(emailSubstring);

    const projectMembers = plainToInstance(UserDTO, users, {
      excludeExtraneousValues: true,
    });
    return new SearchUserResponseDTO(projectMembers);
  }
}
