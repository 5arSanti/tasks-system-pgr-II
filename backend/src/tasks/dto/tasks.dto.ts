import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsDateString, IsInt, IsPositive, IsNumber, MinLength, MaxLength } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsDateString()
    fecha_entrega: string;

    @IsNotEmpty()
    @IsInt()
    asignatura_id: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @MinLength(1)
    @MaxLength(11)
    usuario_id: number;
}


export class UpdateTaskDto extends PartialType(CreateTaskDto) { }

export class UserTaskDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @MinLength(1)
    @MaxLength(11)
    usuario_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    tarea_id: number;
}

