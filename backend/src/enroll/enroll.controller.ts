import { Body, Controller, Delete, Get, HttpException, InternalServerErrorException, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { EnrollService } from './enroll.service';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';
import { TasksResponseDTO, UserTaskDto } from 'src/tasks/dto/tasks.dto';
import { UsersResponseDTO } from 'src/users/dto/users.dto';
import { EnrolledUsersResponseDTO } from './dto/enroll.dto';

@UseGuards(JwtAuthGuard)
@Controller('enroll')
export class EnrollController {
  constructor(
    private readonly enrollService: EnrollService,
  ) { }

  @UseGuards(TeacherRoleGuard)
  @Post()
  async assignTask(@Body() assignTaskDto: UserTaskDto) {
    try {
      return await this.enrollService.enrollTask(assignTaskDto);
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.response);
    }
  }

  @UseGuards(TeacherRoleGuard)
  @Delete()
  async deleteAssignedTask(@Body() userTaskInfo: UserTaskDto) {
    try {
      return await this.enrollService.deleteEnrolledTask(userTaskInfo);
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.response);
    }
  }


  @Get('tasks/:user_id')
  async getAssignedTaskByUserId(@Param('user_id') user_id: number): Promise<TasksResponseDTO> {
    try {
      const tasks = await this.enrollService.getEnrolledTasksByUser(user_id);

      return { tasks };
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.response);
    }
  }

  @Get('users/:task_id')
  async getAssignedUsersByTaskId(@Param('task_id') task_id: number): Promise<EnrolledUsersResponseDTO> {
    try {
      const enrolled_users = await this.enrollService.getEnrolledUsersByTask(task_id);

      return { enrolled_users };
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.response);
    }
  }
}
