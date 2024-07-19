import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";
import TaskParticipants from "./taskParticipants.entity";

@Entity()
class Task extends AbstractEntity {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @ManyToOne(() => Employee, (employee) => employee.tasks)
    createdBy: Employee;

    @Column()
    maxParticipants: number;

    @Column({
        nullable: true,
        default: 0,
    })
    currentParticipants: number;

    @Column()
    totalBounty: number;

    @Column()
    deadLine: Date;

    @OneToMany(() => TaskParticipants, (taskParticipants) => taskParticipants.task)
    participants: TaskParticipants[];

}

export default Task;
