import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  TokenCreateRequestDTO,
  TokenCreateResponseDTO,
} from './dto/create-token.dto';
import { ApiResponse } from '@nestjs/swagger';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 200,
    type: TokenCreateResponseDTO,
  })
  async createToken(
    @Body() data: TokenCreateRequestDTO,
  ): Promise<TokenCreateResponseDTO> {
    const { accessToken, refreshToken } = await this.authService.createToken(
      data.email,
      data.password,
    );

    return { accessToken, refreshToken };
  }
}
