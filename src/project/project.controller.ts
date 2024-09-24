import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from 'src/auth/guard/auth.guard';

import { ProjectService } from './project.service';
import { ProjectCreateRequestDTO } from './dto/create-project.dto';
import { OwnProjectResponseDTO, ProjectDTO } from './dto/get-own-projects.dto';
import { plainToInstance } from 'class-transformer';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createProject(@Req() request, @Body() body: ProjectCreateRequestDTO) {
    const { title, productDescription, budget, startDate, endDate, members } =
      body;

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

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getProjects(@Req() request) {
    const projects = await this.projectService.getOwnProjects(request.user.id);
    const projectMembers = plainToInstance(ProjectDTO, projects, {
      excludeExtraneousValues: true,
    });

    return new OwnProjectResponseDTO(projectMembers);
  }
}
