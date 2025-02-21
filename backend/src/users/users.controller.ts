import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { FilterUsersDTO, RegisterUserDTO, UserIdDTO } from './dto/users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TeacherRoleGuard } from 'src/auth/guards/teacher-role.guard';

@UseGuards(JwtAuthGuard, TeacherRoleGuard)
@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }

  @Get()
  async getUsers(@Query() usersFilters: FilterUsersDTO) {
    return await this.usersService.getUsers(usersFilters);
  }


  @Post()
  async registeruser(@Body() userInfo: RegisterUserDTO) {
    try {
      await this.usersService.registrarUsuario(userInfo);

      return {
        success: true,
        message: 'Usuario registrado con éxito'
      }
    }
    catch (error) {
      throw error
    }
  }


  @Delete()
  async deleteUser(@Query() user: UserIdDTO) {
    try {
      await this.usersService.deleteUser(user);
      return { success: true, message: 'Usuario eliminado con éxito' };
    } catch (error) {
      throw error
    }
  }
}
