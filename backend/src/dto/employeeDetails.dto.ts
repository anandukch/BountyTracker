import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EmployeeDetailsDto{
    @IsNotEmpty()
    @IsString()
    gender:string;

    @IsNotEmpty()
    @IsDate()
    birthday:Date;

    @IsNotEmpty()
    @IsString()
    phoneNo:string;

    @IsNotEmpty()
    @IsNumber()
    totalBounty:number;

}