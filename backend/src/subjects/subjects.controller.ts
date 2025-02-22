import { Body, Controller, Get, HttpException, InternalServerErrorException, Post, Query, UseGuards } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';
import { SubjectInfoDTO } from './dto/subject.dto';

@Controller('subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {

  constructor(
    private readonly subjectsService: SubjectsService
  ) { }

  @Get()
  async getSubjects() {
    try {
      const subjects = await this.subjectsService.getSubjects();

      return { success: true, subjects }
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }

  @Post()
  @UseGuards(TeacherRoleGuard)
  async createSubject(@Body() subjectInfo: SubjectInfoDTO) {
    try {
      await this.subjectsService.createSubject(subjectInfo);

      return { success: true, message: 'Asignatura creada correctamente' }
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }
}
