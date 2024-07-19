import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class EmployeeDetails extends AbstractEntity {
    @OneToOne(() => Employee, (employee) => employee.details)
    @JoinColumn()
    employee: Employee;

    @Column()
    gender: string;

    @Column()
    birthday: Date;

    @Column()
    phoneNo: string;

    @Column()
    totalBounty: number;
}

export default EmployeeDetails;
