import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserTaskDto } from 'src/tasks/dto/tasks.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from 'src/users/users.service';
import { DataSource } from 'typeorm';

@Injectable()
export class EnrollService {
    constructor(
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
        private readonly usersService: UsersService,
        private readonly tasksService: TasksService,
    ) { }

    async enrollTask(assignTaskDto: UserTaskDto) {
        const { tarea_id, usuario_id } = assignTaskDto;

        await this.tasksService.validateTask(tarea_id);

        const user = await this.usersService.validateUser(usuario_id);

        if (user[0].rol_id !== 2) throw new BadRequestException('El usuario no es un estudiante');

        const query = `
            INSERT INTO estados_tareas (tarea_id, usuario_id, estado)
            VALUES (?, ?, 'pendiente')
        `;

        await this.dataSource.query(query, [tarea_id, usuario_id]);

        return { message: 'Tarea asignada correctamente' };
    }

    async deleteEnrolledTask(userTaskInfo: UserTaskDto) {
        const { tarea_id, usuario_id } = userTaskInfo;

        await this.tasksService.validateTask(tarea_id);

        const user = await this.usersService.validateUser(usuario_id);

        if (user[0].rol_id !== 2) throw new NotFoundException('El usuario no es un estudiante');

        const query = `
            DELETE FROM estados_tareas
            WHERE tarea_id = ? AND usuario_id = ?
        `;

        await this.dataSource.query(query, [tarea_id, usuario_id]);

        return { message: 'Tarea asignada correctamente' };
    }

    async getEnrolledTasks(usuario_id: number) {
        await this.usersService.validateUser(usuario_id);

        const query = `
            SELECT 
                t.id AS task_id,
                t.titulo AS task_title,
                t.descripcion AS task_description,
                t.fecha_entrega AS task_due_date,
                t.creado_en AS task_created_at,
                t.actualizado_en AS task_updated_at,

                et.estado AS task_status,

                a.nombre AS subject_name,

                u.nombre AS creator_name,
                u.apellido AS creator_lastname

            FROM estados_tareas et 
                JOIN tareas t ON et.tarea_id = t.id
                JOIN asignaturas a ON t.asignatura_id = a.id
                JOIN usuarios u ON et.usuario_id = u.id

            WHERE et.usuario_id = ?
        `;

        const tasksByUser = await this.dataSource.query(query, [usuario_id]);

        return tasksByUser;
    }
}
