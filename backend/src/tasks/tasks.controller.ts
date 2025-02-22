import { Controller, Post, Body, Put, Param, Delete, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';
import { TasksService } from './tasks.service';
import { AssignTaskDto, CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';

@UseGuards(JwtAuthGuard, TeacherRoleGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }

  @Post('assign')
  assignTask(@Body() assignTaskDto: AssignTaskDto) {
    return this.tasksService.assignTask(assignTaskDto);
  }
}
