import { Body, Controller, Delete, Get, HttpException, InternalServerErrorException, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { EnrollService } from './enroll.service';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';
import { TasksResponseDTO, UserTaskDto } from 'src/tasks/dto/tasks.dto';

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


  @Get(':user_id')
  async getAssignedTask(@Param('user_id') user_id: number): Promise<TasksResponseDTO> {
    try {
      const tasks = await this.enrollService.getEnrolledTasks(user_id);

      return { tasks };
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.response);
    }
  }
}
