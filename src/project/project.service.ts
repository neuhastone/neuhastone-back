import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
  ) {}

  async createProject(
    title: string,
    productDescription: string,
    budget: number,
    startDate: Date,
    endDate: Date,
    memberIds: number[],
    creator: User,
  ) {
    const project = new Project({
      title,
      productDescription,
      budget,
      startDate,
      endDate,
      creator,
    });

    const members = await this.userService.getUsersById(memberIds);
    project.projectMembers = members;
    const addedProject = await this.projectRepository.save(project);

    return addedProject;
  }

  async getOwnProjects(creatorId: number) {
    return await this.projectRepository.find({
      where: { creatorId: creatorId },
    });
  }
}
