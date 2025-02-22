import { Module } from '@nestjs/common';
import { EnrollController } from './enroll.controller';
import { EnrollService } from './enroll.service';
import { DatabaseModule } from 'src/database/database.module';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EnrollController],
  providers: [EnrollService, TasksService, UsersService],
})
export class EnrollModule {}
