import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from 'src/auth/guard/auth.guard';

import { ProjectService } from './project.service';
import { ProjectCreateRequestDTO } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createProject(@Req() request, @Body() body: ProjectCreateRequestDTO) {
    const { title, productDescription, budget, startDate, endDate, members } =
      body;

    console.log(members);
    return await this.projectService.createProject(
      title,
      productDescription,
      budget,
      startDate,
      endDate,
      members.map((member) => member.id),
      request.user,
    );
  }
}
