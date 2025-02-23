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

export class TaskResponse {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    task_id: number;

    @IsNotEmpty()
    @IsString()
    task_title: string;

    @IsNotEmpty()
    @IsString()
    task_description: string;

    @IsNotEmpty()
    @IsDateString()
    task_due_date: Date;

    @IsNotEmpty()
    @IsDateString()
    task_created_at: Date;

    @IsNotEmpty()
    @IsDateString()
    task_updated_at: Date;

    @IsNotEmpty()
    @IsString()
    task_state: string;

    @IsNotEmpty()
    @IsString()
    subject_name: string;

    @IsNotEmpty()
    @IsString()
    creator_name: string;

    @IsNotEmpty()
    @IsString()
    creator_lastname: string;
}

