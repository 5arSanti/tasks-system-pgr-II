import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
      ) {}
    
      async validateUser(body: LoginDTO) {
        const { email, password } = body;
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

    
      async login(body: LoginDTO) {

        const user = await this.validateUser(body);
    
        const payload = { id: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(user);
    
        return { access_token: token };
      }
}
