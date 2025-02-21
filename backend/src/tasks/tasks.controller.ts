import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';

@UseGuards(JwtAuthGuard, TeacherRoleGuard)
@Controller('tasks')
export class TasksController {}
