import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import { Role } from "../utils/role.enum";

@Entity()
class Employee extends AbstractEntity {
    @Column()
    name: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    age: number;

    @Column()
    role: Role;

    @Column()
    totalBounty: number;
}

export default Employee;
