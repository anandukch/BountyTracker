import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import "reflect-metadata";
import { Role } from "../utils/role.enum";
import Employee from "../entity/employee.entity";

export class EmployeeResposneDto {
    password: string;

    public constructor(employee: Employee) {
        Object.assign(this, employee);
        delete this.password;
    }
}
