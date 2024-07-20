import { Request } from "express";
import { Role } from "./role.enum";
import Employee from "../entity/employee.entity";

export interface RequestWithRole extends Request {
	user:Employee,
	name: string;
	email: string;
	role: Role;
}
