import { Controller, Post, Body, Put, Param, Delete, UseGuards, Get, InternalServerErrorException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, UserTaskDto } from './dto/tasks.dto';

@UseGuards(JwtAuthGuard, TeacherRoleGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':task_id')
  async findOne(@Param('task_id') task_id: number) {
    return await this.tasksService.findOne(task_id);
  }

  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Put(':task_id')
  async update(@Param('task_id') task_id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.update(task_id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.tasksService.remove(id);
  }
}
