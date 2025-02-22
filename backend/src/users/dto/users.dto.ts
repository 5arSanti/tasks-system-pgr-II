import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsBooleanString, IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class UserIdDTO {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @MinLength(1)
    @MaxLength(11)
    id: number;
}

export class UserDTO extends PartialType(UserIdDTO) {
    @IsNotEmpty()
    @MinLength(1)
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    correo: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    rol_id: number;
}


export class RegisterUserDTO extends PartialType(UserDTO) {    
    @IsNotEmpty()
    @IsStrongPassword()
    contrasena: string;
}

export class FilterUsersDTO {
    @IsOptional()
    @IsBoolean()
    @IsBooleanString()
    all_users?: boolean;

    @IsOptional()
    @IsBoolean()
    students?: boolean;

    @IsOptional()
    @IsBoolean()
    teachers?: boolean;
}

export class UserResponseDTO extends PartialType(UserIdDTO) {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    role_id: string;

    @IsNotEmpty()
    @IsString()
    role_name: string;
}