import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class SubjectInfoDTO {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim().toUpperCase())
    nombre: string;
}