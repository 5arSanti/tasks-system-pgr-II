import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FilterUsersDTO, RegisterUserDTO } from './dto/users.dto';


@Injectable()
export class UsersService {
    constructor(
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    ) { }

    async registrarUsuario(userInfo: RegisterUserDTO) {
        const { id, nombre, apellido, correo, contrasena, rol_id } = userInfo;

        const usuarioExistente = await this.dataSource.query(
            'SELECT * FROM usuarios WHERE correo = ? LIMIT 1',
            [correo],
        );

        if (usuarioExistente.length > 0) {
            throw new BadRequestException('El correo ya está en uso');
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
}
