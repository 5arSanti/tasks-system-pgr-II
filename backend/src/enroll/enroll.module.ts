import { Module } from '@nestjs/common';
import { EnrollController } from './enroll.controller';
import { EnrollService } from './enroll.service';
import { DatabaseModule } from 'src/database/database.module';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from 'src/users/services/users.service';
import { ValidateUsersService } from 'src/users/services/validate-user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EnrollController],
  providers: [EnrollService, TasksService, ValidateUsersService],
})
export class EnrollModule {}
