import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('project')
export class ProjectController {
  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async test() {
    return 'test';
  }
}
