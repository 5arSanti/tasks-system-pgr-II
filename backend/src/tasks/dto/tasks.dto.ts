import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsDateString, IsInt, IsOptional } from 'class-validator';

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
    @IsInt()
    usuario_id: number;
}


export class UpdateTaskDto extends PartialType(CreateTaskDto) { }

export class AssignTaskDto {
    @IsNotEmpty()
    @IsInt()
    tarea_id: number;

    @IsNotEmpty()
    @IsInt()
    usuario_id: number;
}