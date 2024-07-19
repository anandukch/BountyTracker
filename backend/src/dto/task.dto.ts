import { IsDate, IsNotEmpty, isNumber, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    totalBounty: number;

    @IsNotEmpty()
    @IsNumber()
    maxParticipants: number;

    @IsNotEmpty()
    @IsString()
    deadLine: Date;
}
