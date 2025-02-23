import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto, UserTaskDto } from '../dto/tasks.dto';
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


  async create(createTaskInfo: CreateTaskDto) {
    const { titulo, descripcion, fecha_entrega, asignatura_id, usuario_id } = createTaskInfo;

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
}
