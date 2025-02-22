import { Body, Controller, Delete, Get, HttpException, InternalServerErrorException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { FilterUsersDTO, RegisterUserDTO, UserIdDTO, UserResponseDTO } from './dto/users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';

@UseGuards(JwtAuthGuard, TeacherRoleGuard)
@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }

  @Get()
  async getUsers(@Query() usersFilters: FilterUsersDTO): Promise<UserResponseDTO[]> {
    try {
      const users = await this.usersService.getUsers(usersFilters);

      return users;
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }


  @Post()
  async registeruser(@Body() userInfo: RegisterUserDTO) {
    try {
      await this.usersService.registrarUsuario(userInfo);

      return { success: true, message: 'Usuario registrado con éxito' }
    }
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }


  @Delete()
  async deleteUser(@Query() user: UserIdDTO) {
    try {
      await this.usersService.deleteUser(user);
      
      return { success: true, message: 'Usuario eliminado con éxito' };
    } 
    catch (error) {
      if (error instanceof HttpException) { throw error };

      throw new InternalServerErrorException(error.message);
    }
  }
}
