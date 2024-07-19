import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";

@Entity()
class Employee extends AbstractEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    age: number;
}

export default Employee;
