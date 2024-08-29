import { ApiProperty } from '@nestjs/swagger';

export class TokenCreateRequestDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class TokenCreateResponseDTO {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
