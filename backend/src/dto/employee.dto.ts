import { Type } from "class-transformer";
import "reflect-metadata";
import { Role } from "../utils/role.enum";
import Employee from "../entity/employee.entity";
import { EmployeeDetailsDto } from "./employeeDetails.dto";
import { IsEmail, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateEmployeeDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsEmail()
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsEnum(Role)
	role: Role;

	@IsNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => EmployeeDetailsDto)
	details: EmployeeDetailsDto;
}

export class EmployeeResposneDto {
	password: string;

	public constructor(employee: Employee) {
		Object.assign(this, employee);
		delete this.password;
	}	
}
