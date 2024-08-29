import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from 'src/configs/configs.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync(AppConfigService.getJwtModuleOptions()),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
