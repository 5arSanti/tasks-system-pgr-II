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
  ) { }

  async validateUser(body: LoginDTO) {
    const { correo, contrasena } = body;
    const usuario = await this.dataSource.query(
      'SELECT * FROM usuarios WHERE correo = ? LIMIT 1',
      [correo],
    );

    if (!usuario.length) throw new UnauthorizedException('Usuario no encontrado');

    const user = usuario[0];
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    return user;
  }


  async login(body: LoginDTO) {

    const user = await this.validateUser(body);

    const payload = { 
      id: user.id, 
      correo: user.correo, 
      rol_id: user.rol_id
    };
    const token = this.jwtService.sign({user: payload});
  
    return { access_token: token };
  }
}
