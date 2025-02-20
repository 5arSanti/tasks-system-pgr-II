import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
      ) {}
    
      async validarUsuario(email: string, password: string) {
        const usuario = await this.dataSource.query(
          'SELECT * FROM usuarios WHERE email = ? LIMIT 1',
          [email],
        );
    
        if (!usuario.length) throw new UnauthorizedException('Usuario no encontrado');
    
        const user = usuario[0];
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');
    
        return user;
      }

    
      async login(email: string, password: string) {
        const usuario = await this.validarUsuario(email, password);
    
        const payload = { id: usuario.id, email: usuario.email };
        const token = this.jwtService.sign(payload);
    
        return { access_token: token };
      }
}
