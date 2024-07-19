import { Request } from "express";
import { Role } from "./role.enum";

export interface RequestWithRole extends Request {
    name: string;
    email: string;
    role: Role;
}
