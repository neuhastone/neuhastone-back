import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class ProjectDTO {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  productDescription: string;
}

export class OwnProjectResponseDTO {
  @ApiProperty({
    type: [ProjectDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectDTO)
  projects: ProjectDTO[];

  constructor(projects: ProjectDTO[]) {
    this.projects = projects;
  }
}
