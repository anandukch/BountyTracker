import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EmployeeDetailsDto{
    @IsNotEmpty()
    @IsString()
    gender:string;

    @IsNotEmpty()
    @IsString()
    birthday:string;

    @IsNotEmpty()
    @IsString()
    phoneNo:string;

    @IsNotEmpty()
    @IsNumber()
    totalBounty:number;

}