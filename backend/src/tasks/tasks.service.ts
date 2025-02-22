import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AssignTaskDto, CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource
    ) { }

    async findOne(id: number) {
        const query = `SELECT * FROM tareas WHERE id = ?`;
        const result = await await this.dataSource.query(query, [id]);

        if (result.length === 0) throw new NotFoundException('Tarea no encontrada');

        return result[0];
    }

    async findAll() {
        const query = `SELECT * FROM tareas`;
        return await this.dataSource.query(query);
    }


    async create(createTaskDto: CreateTaskDto) {
        const { titulo, descripcion, fecha_entrega, asignatura_id, usuario_id } = createTaskDto;

        const query = `
            INSERT INTO tareas (titulo, descripcion, fecha_entrega, asignatura_id, usuario_id)
            VALUES (?, ?, ?, ?, ?)
        `;

        await this.dataSource.query(query, [titulo, descripcion, fecha_entrega, asignatura_id, usuario_id]);

        return { message: 'Tarea creada correctamente' };
    }



    async update(id: number, updateTaskDto: UpdateTaskDto) {
        const { titulo, descripcion, fecha_entrega, asignatura_id, usuario_id } = updateTaskDto;

        const query = `
            UPDATE tareas 
            SET titulo = ?, descripcion = ?, fecha_entrega = ?, asignatura_id = ?, usuario_id = ?, actualizado_en = NOW()
            WHERE id = ?
        `;

        const result = await this.dataSource.query(query, [titulo, descripcion, fecha_entrega, asignatura_id, usuario_id, id]);

        if (result.affectedRows === 0) throw new NotFoundException('Tarea no encontrada');

        return { message: 'Tarea actualizada correctamente' };
    }

    async remove(id: number) {
        const query = `DELETE FROM tareas WHERE id = ?`;
        const result = await this.dataSource.query(query, [id]);

        if (result.affectedRows === 0) throw new NotFoundException('Tarea no encontrada');

        return { message: 'Tarea eliminada correctamente' };
    }

    async assignTask(assignTaskDto: AssignTaskDto) {
        const { tarea_id, usuario_id } = assignTaskDto;

        const checkQuery = `SELECT * FROM tareas WHERE id = ?`;
        const tarea = await this.dataSource.query(checkQuery, [tarea_id]);

        if (tarea.length === 0) throw new NotFoundException('Tarea no encontrada');

        const query = `
            INSERT INTO estados_tareas (tarea_id, usuario_id, estado)
            VALUES (?, ?, 'pendiente')
        `;

        await this.dataSource.query(query, [tarea_id, usuario_id]);
    }
}
