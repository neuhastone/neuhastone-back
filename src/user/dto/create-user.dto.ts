import { ApiProperty } from '@nestjs/swagger';

export class UserCreateRequestDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
