import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async test() {
    return 'test';
  }
}
