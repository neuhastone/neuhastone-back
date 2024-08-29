import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

@Module({})
export class AppConfigService {
  static getJwtModuleOptions(): JwtModuleAsyncOptions {
    return {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const jwtOption = AppConfigService.getJwtOptions(configService);

        return jwtOption;
      },
      inject: [ConfigService],
    };
  }

  static getJwtOptions(configService: ConfigService): JwtModuleOptions {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    const expiresIn = configService.get<string>('JWT_EXPIRED_IN');

    return {
      secret: jwtSecret,
      signOptions: {
        expiresIn,
      },
    };
  }

  static getDotenvConfigs(): string {
    const nodeEnv = process.env.NODE_ENV;

    let dotenvFilePath = '.env';

    switch (nodeEnv) {
      case 'production':
        dotenvFilePath = '.env.production';
        break;
      case 'development':
        dotenvFilePath = '.env.dev';
        break;
      case 'staging':
        dotenvFilePath = '.env.staging';
        break;
      default:
        dotenvFilePath = '.env.local';
        break;
    }

    console.log(dotenvFilePath);

    return path.resolve(__dirname, 'env', dotenvFilePath);
  }

  static getDatabaseConfigs(): TypeOrmModuleAsyncOptions {
    return {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'postgres',
          entities: ['dist/**/entities/*.entity.{ts,js}'],
          migrations: ['dist/migrations/**/*{.ts,.js}'],
          cli: {
            entitiesDir: ['dist/**/entities/*{.ts,.js}'],
            migrationsDir: 'dist/migration',
          },
          host: configService.get<string>('POSTGRES_HOST'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          port: configService.get<number>('POSTGRES_PORT'),
          database: configService.get<string>('POSTGRES_DATABASE'),
          synchronize: configService.get<string>('ORM_ENTITY_SYNC') === 'true',
          logging: configService.get<string>('ORM_LOGGING') === 'true',
          namingStrategy: new SnakeNamingStrategy(),
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    };
  }
}
