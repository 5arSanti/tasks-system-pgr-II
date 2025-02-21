import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { LoginInterface } from "../interfaces/auth.interface";

export class LoginDTO implements LoginInterface {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    correo: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    contrasena: string;
}