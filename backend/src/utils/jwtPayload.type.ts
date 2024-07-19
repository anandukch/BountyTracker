import { Role } from "./role.enum";

export type jwtPayload = {
    name: string;
    email: string;
    role: Role;
};
