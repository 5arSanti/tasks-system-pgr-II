import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: LoginDTO) {
        try {

            const token = this.authService.login(body.email, body.password);

            return token;
        } 
        catch (error) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Unauthorized',
            }, HttpStatus.UNAUTHORIZED);
        }
    }
}
