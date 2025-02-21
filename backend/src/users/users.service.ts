import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FilterUsersDTO, RegisterUserDTO, UserIdDTO } from './dto/users.dto';


@Injectable()
export class UsersService {
    constructor(
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    ) { }

    async registrarUsuario(userInfo: RegisterUserDTO) {
        const { id, nombre, apellido, correo, contrasena, rol_id } = userInfo;

        const usuarioExistente = await this.dataSource.query(
            'SELECT * FROM usuarios WHERE correo = ? OR id = ? LIMIT 1',
            [correo, id],
        );

        if (usuarioExistente.length > 0) {
            throw new BadRequestException('Este usuario ya se encuentra registrado');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        await this.dataSource.query( 
            `INSERT INTO usuarios (id, nombre, apellido, correo, contrasena, rol_id) VALUES (?, ?, ?, ?, ?, ?)`,
            [id, nombre, apellido, correo, hashedPassword, rol_id],
        );
    }

    async getUsers(usersFilters: FilterUsersDTO) {
        if (usersFilters.all_users) {
            return await this.dataSource.query(`SELECT * FROM usuarios`);
        }

        const conditions = [];
        const values = [];

        if (usersFilters.students) {
            conditions.push('rol_id = ?');
            values.push(2);
        }

        if (usersFilters.teachers) {
            conditions.push('rol_id = ?');
            values.push(1);
        }

        if (conditions.length === 0) {
            conditions.push('rol_id = ?');
            values.push(1);
        }

        const query = `SELECT * FROM usuarios WHERE ${conditions.join(' OR ')}`;
        return await this.dataSource.query(query, values);
    }

    async deleteUser(user: UserIdDTO) {
        const result = await this.dataSource.query('DELETE FROM usuarios WHERE id = ?', [user.id]);
    
        if (result.affectedRows === 0) {
          throw new NotFoundException('Usuario no encontrado');
        }
    
        return { message: 'Usuario eliminado correctamente' };
      }
}
