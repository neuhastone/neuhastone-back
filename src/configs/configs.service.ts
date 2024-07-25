import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({})
export class AppConfigService {
  static getDotenvConfigs(): string {
    const nodeEnv = process.env.ENV;

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
    return dotenvFilePath;
  }

  static getDatabaseConfigs(): TypeOrmModuleAsyncOptions {
    return {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'postgres',
          entities: ['dist/**/entities/*{.ts,.js}'],
          migrations: ['dist/migrations/**/*{.ts,.js}'],
          cli: {
            entitiesDir: ['dist/**/entities/*{.ts,.js}'],
            migrationsDir: 'dist/migration',
          },
          host: configService.get<string>('POSTGRES_HOST'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DATABASE'),
          synchronize: configService.get<string>('ORM_ENTITY_SYNC') === 'true',
          logging: configService.get<string>('ORM_LOGGING') === 'true',
          namingStrategy: new SnakeNamingStrategy(),
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    };
  }
}
