import { Controller, Post, Body, Put, Param, Delete, UseGuards, Get, InternalServerErrorException, HttpException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, UserTaskDto } from './dto/tasks.dto';

@UseGuards(JwtAuthGuard, TeacherRoleGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get(':task_id')
  async findOne(@Param('task_id') task_id: number) {
    try {
      return await this.tasksService.findOne(task_id);

    } 
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.tasksService.findAll();
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.tasksService.create(createTaskDto);
    } 
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }

  @Put(':task_id')
  async update(@Param('task_id') task_id: number, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      return await this.tasksService.update(task_id, updateTaskDto);

    } 
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return await this.tasksService.remove(id);
    } 
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }
}
