import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ValidateTasksService {
    constructor(
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource
    ) { }

    async validateTask(task_id: number) {
        const query = `SELECT * FROM tareas WHERE id = ?`;

        const task = await this.dataSource.query(query, [task_id]);

        if (task.length === 0) throw new NotFoundException('Tarea no encontrada');

        return task[0];
    }
}
