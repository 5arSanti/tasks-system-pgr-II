import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserTaskDto } from 'src/tasks/dto/tasks.dto';
import { EnrollService } from './enroll.service';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';

@UseGuards(JwtAuthGuard)
@Controller('enroll')
export class EnrollController {
    constructor(
        private readonly enrollService: EnrollService,
    ) {}

    @UseGuards(TeacherRoleGuard)
    @Post()
    async assignTask(@Body() assignTaskDto: UserTaskDto) {
      try {
        return await this.enrollService.enrollTask(assignTaskDto);
      } 
      catch (error) {
        throw new InternalServerErrorException(error.message);  
      }
    }
  
    @UseGuards(TeacherRoleGuard)
    @Delete()
    async deleteAssignedTask(@Body() userTaskInfo: UserTaskDto) {
      try {
        return await this.enrollService.deleteEnrolledTask(userTaskInfo);
      } 
      catch (error) {
        throw new InternalServerErrorException(error.response);  
      }
    }
  

    @Get(':user_id')
    async getAssignedTask(@Param('user_id') user_id: number) {
      try {
        return await this.enrollService.getEnrolledTasks(user_id);
      } 
      catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
}
