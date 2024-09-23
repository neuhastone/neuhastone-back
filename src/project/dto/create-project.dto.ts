import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { UserDTO } from 'src/user/dto/search-user-response.dto';

export class ProjectCreateRequestDTO {
  @ApiProperty()
  title: string;
  @ApiProperty()
  productDescription: string;
  @ApiProperty()
  budget: number;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;

  @ApiProperty({
    type: [UserDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDTO)
  members: UserDTO[];
}
