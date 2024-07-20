import { Column, Entity, ManyToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Task from "./task.entity";
import Employee from "./employee.entity";

@Entity()
class TaskParticipants extends AbstractEntity {
	@ManyToOne(() => Task, (task) => task.participants)
	task: Task;

	@ManyToOne(() => Employee, (employee) => employee.participatingTasks)
	employee: Employee;

	@Column()
	contribution: number;
}

export default TaskParticipants;
