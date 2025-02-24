import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskResponseDTO, UserTaskDto } from 'src/tasks/dto/tasks.dto';
import { ValidateTasksService } from 'src/tasks/services/validate-tasks.service';
import { UserResponseDTO, UsersResponseDTO } from 'src/users/dto/users.dto';
import { ValidateUsersService } from 'src/users/services/validate-user.service';
import { DataSource } from 'typeorm';

@Injectable()
export class EnrollService {
  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    private readonly validateUsersService: ValidateUsersService,
    private readonly validateTasksService: ValidateTasksService
  ) { }


  async validateEnrolledTask(assignTaskDto: UserTaskDto) {
    const { tarea_id, usuario_id } = assignTaskDto;

    const query = `
      SELECT * FROM estados_tareas
      WHERE tarea_id = ? AND usuario_id = ?
    `;

    const [task] = await this.dataSource.query(query, [tarea_id, usuario_id]);

    if (task) throw new BadRequestException('Este usuario ya tiene esta tarea asignada');
  }


  async enrollTask(assignTaskDto: UserTaskDto) {
    const { tarea_id, usuario_id } = assignTaskDto;

    await this.validateTasksService.validateTask(tarea_id);

    const user = await this.validateUsersService.validateUser(usuario_id);

    if (user.rol_id !== 2) throw new BadRequestException('El usuario no es un estudiante');

    await this.validateEnrolledTask(assignTaskDto);

    const query = `
      INSERT INTO estados_tareas (tarea_id, usuario_id, estado)
      VALUES (?, ?, 'pendiente')
    `;

    await this.dataSource.query(query, [tarea_id, usuario_id]);

    return { message: 'Tarea asignada correctamente' };
  }


  async deleteEnrolledTask(userTaskInfo: UserTaskDto) {
    const { tarea_id, usuario_id } = userTaskInfo;

    await this.validateTasksService.validateTask(tarea_id);

    const user = await this.validateUsersService.validateUser(usuario_id);

    if (user.rol_id !== 2) throw new NotFoundException('El usuario no es un estudiante');

    const query = `
      DELETE FROM estados_tareas
      WHERE tarea_id = ? AND usuario_id = ?
    `;

    await this.dataSource.query(query, [tarea_id, usuario_id]);

    return { message: 'Tarea asignada correctamente' };
  }


  async getEnrolledTasksByUser(usuario_id: number): Promise<TaskResponseDTO[]> {
    await this.validateUsersService.validateUser(usuario_id);

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
        JOIN usuarios u ON t.usuario_id = u.id

      WHERE et.usuario_id = ?
    `;

    const tasksByUser: TaskResponseDTO[] = await this.dataSource.query(query, [usuario_id]);

    return tasksByUser;
  }

  
  async getEnrolledUsersByTask(task_id: number): Promise<UserResponseDTO[]> {
    await this.validateTasksService.validateTask(task_id);

    const query = `
      SELECT 
        u.id AS id,
        u.nombre AS name,
        u.apellido AS last_name,
        u.correo AS email,
        r.id AS role_id,
        r.nombre AS role_name

      FROM estados_tareas et 
        JOIN usuarios u ON et.usuario_id = u.id
        JOIN roles r ON u.rol_id = r.id

      WHERE et.tarea_id = ?
    `;

    const usersByTask: UserResponseDTO[] = await this.dataSource.query(query, [task_id]);

    return usersByTask;
  }
}
