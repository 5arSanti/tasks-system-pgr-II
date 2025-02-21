import { IsBoolean, IsBooleanString, IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class RegisterUserDTO {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @MinLength(1)
    @MaxLength(11)
    id: number;

    @IsNotEmpty()
    @MinLength(1)
    @IsString()
    nombre: string;
    
    @IsNotEmpty()
    @MinLength(1)
    @IsString()
    apellido: string;
    
    @IsNotEmpty()
    @MinLength(1)
    @IsString()
    @IsEmail()
    correo: string;
    
    @IsNotEmpty()
    @IsStrongPassword()
    contrasena: string;
    
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @MinLength(1)
    @IsIn([1, 2])
    rol_id: number;
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