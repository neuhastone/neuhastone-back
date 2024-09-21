import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './configs/configs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { PorjectService } from './porject/porject.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: AppConfigService.getDotenvConfigs(),
    }),
    TypeOrmModule.forRootAsync(AppConfigService.getDatabaseConfigs()),
    UserModule,
    AuthModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService, PorjectService],
})
export class AppModule {}
