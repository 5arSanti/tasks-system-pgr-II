import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FilterUsersDTO, RegisterUserDTO, UserDTO, UserIdDTO, UserResponseDTO, UsersNoDetailsResponseDTO } from '../dto/users.dto';


@Injectable()
export class UsersService {
    constructor(
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    ) { }

    async getUsers(usersFilters: FilterUsersDTO): Promise<UserResponseDTO[] | UsersNoDetailsResponseDTO[]> {
        let selectFields = `
            u.id AS id,
            u.nombre AS name
        `;

        if (!usersFilters.no_details) {
            selectFields += `,
                u.apellido AS last_name,
                u.correo AS email,
                r.id AS role_id,
                r.nombre AS role_name
            `;
        }

        const baseQuery = `
            SELECT ${selectFields}
            FROM usuarios u 
            JOIN roles r ON u.rol_id = r.id
        `;

        if (usersFilters.all_users) {
            return await this.dataSource.query(baseQuery);
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

        if (usersFilters.no_details) {

        }

        if (conditions.length === 0) {
            conditions.push('rol_id = ?');
            values.push(2);
        }

        const query = `${baseQuery} WHERE ${conditions.join(' OR ')} `;

        return await this.dataSource.query(query, values);
    }

    async registrarUsuario(userInfo: RegisterUserDTO) {
        const { id, nombre, apellido, correo, contrasena, rol_id, confirmar_contraseña } = userInfo;

        if (!(contrasena === confirmar_contraseña)) throw new BadRequestException('Las contraseñas no coinciden');

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
            [id, nombre, apellido, correo, hashedPassword, rol_id ? rol_id : 2],
        );
    }

    async deleteUser(user: UserIdDTO) {
        const result = await this.dataSource.query('DELETE FROM usuarios WHERE id = ?', [user.id]);

        if (result.affectedRows === 0) {
            throw new NotFoundException('Usuario no encontrado');
        }

        return { message: 'Usuario eliminado correctamente' };
    }
}
