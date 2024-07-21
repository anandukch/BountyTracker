import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";
import TaskParticipants from "./taskParticipants.entity";
import Comment from "./comment.entity";

@Entity()
class Task extends AbstractEntity {
	@Column()
	title: string;

	@Column()
	description: string;

	@Column({
		nullable: true,
	})
	status: string;

	@ManyToOne(() => Employee, (employee) => employee.tasks)
	createdBy: Employee;

	@Column()
	createdById: number;

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
	startDate: Date;
	
	@Column()
	deadLine: Date;

	@OneToMany(() => TaskParticipants, (taskParticipants) => taskParticipants.task)
	participants: TaskParticipants[];

	@OneToMany(() => Comment, (comment) => comment.task)
	comments: Comment[];
}

export default Task;
