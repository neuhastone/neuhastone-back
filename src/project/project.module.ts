import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [AuthModule, UserModule],
})
export class ProjectModule {}
