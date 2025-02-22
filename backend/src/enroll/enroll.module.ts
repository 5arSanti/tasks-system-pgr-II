import { Module } from '@nestjs/common';
import { EnrollController } from './enroll.controller';
import { EnrollService } from './enroll.service';
import { DatabaseModule } from 'src/database/database.module';
import { TasksService } from 'src/tasks/services/tasks.service';
import { ValidateUsersService } from 'src/users/services/validate-user.service';
import { ValidateTasksService } from 'src/tasks/services/validate-tasks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EnrollController],
  providers: [EnrollService, TasksService, ValidateUsersService, ValidateTasksService],
})
export class EnrollModule {}
