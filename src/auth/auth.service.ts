import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(email: string, password: string) {
    const user: User = await this.userService.getUser(email);
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException();

    const accessToken = await this._createAccessToken(user);
    const refreshToken = await this._createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async _createAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      nickname: user.nickname,
    };

    const accessToken: string = await this.jwtService.signAsync(payload);

    return accessToken;
  }

  async _createRefreshToken(user: User): Promise<string> {
    const payload = { sub: user.id };

    const refreshToken: string = await this.jwtService.signAsync(payload);

    return refreshToken;
  }
}
