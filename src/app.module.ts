import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './configs/configs.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: AppConfigService.getDotenvConfigs(),
    }),
    TypeOrmModule.forRootAsync(AppConfigService.getDatabaseConfigs()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
