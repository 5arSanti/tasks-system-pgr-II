import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { FilterUsersDTO, RegisterUserDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {
    
    constructor(
        private usersSevice: UsersService
    ) {}

    @Get()
    async getUsers(@Param() usersFilters: FilterUsersDTO) {
        return this.usersSevice.getUsers(usersFilters);
    }

    
    @Post("register")
    async registeruser(@Body() userInfo: RegisterUserDTO) {
        try {
            this.usersSevice.registrarUsuario(userInfo);

            return {
                success: true,
                message: 'Usuario registrado con éxito'
            }
        }   
        catch (error) {
            
        }
    }


}
