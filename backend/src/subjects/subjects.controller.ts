import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';
import { SubjectInfoDTO } from './dto/subject.dto';

@Controller('subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {
    
    constructor(
        private readonly subjectsService: SubjectsService
    ) {}
    
    @Get()
    async getSubjects() {
        try {
            const subjects = await this.subjectsService.getSubjects();
            
            return { success: true, subjects }  
        } 
        catch (error) {
            throw error
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
            throw error
        }
    }
}
