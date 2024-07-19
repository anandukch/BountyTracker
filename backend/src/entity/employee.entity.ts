import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from "typeorm";
import AbstractEntity from "./abstract.entity";
import { Role } from "../utils/role.enum";
import EmployeeDetails from "./employeeDetails.entity";
import Task from "./task.entity";

@Entity()
class Employee extends AbstractEntity {
    @Column()
    name: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column()
    role: Role;

    @OneToOne(
        () => EmployeeDetails,
        (employeeDetails: EmployeeDetails) => employeeDetails.employee
    )
    details: EmployeeDetails;

    @OneToMany(() => Task, (task) => task.createdBy)
    tasks: Task[];
}

export default Employee;
