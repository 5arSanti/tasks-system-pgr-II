import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SubjectInfoDTO } from './dto/subject.dto';

@Injectable()
export class SubjectsService {
    constructor(
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    ) { }

    async getSubjects() {
        const subjects = await this.dataSource.query(`
            SELECT id, nombre AS name FROM asignaturas
        `);

        return subjects;
    }

    async createSubject(subjectInfo: SubjectInfoDTO) {
        const subject = await this.dataSource.query(`
            SELECT id FROM asignaturas WHERE UPPER(nombre) = UPPER(?)
        `, [subjectInfo.nombre]);

        if (subject.length > 0) {
            throw new BadRequestException('La asignatura ya existe');
        }

        await this.dataSource.query(`
            INSERT INTO asignaturas (nombre)
            VALUES (?)
        `, [subjectInfo.nombre]);

    }
}
