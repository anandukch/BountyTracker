import { Column, Entity, ManyToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Task from "./task.entity";
import TaskParticipants from "./taskParticipants.entity";
import { CommentType } from "../utils/commentType.enum";
import ReviewStatus from "../utils/reviewStatus.enum";
import Employee from "./employee.entity";

@Entity()
class Comment extends AbstractEntity {
	@ManyToOne(() => Task, (task) => task.comments)
	task: Task;

	@ManyToOne(() => Employee, (employee) => employee.comments)
	employee: Employee;

	@Column()
	commentType: CommentType;

	@Column()
	content: string;

	@Column({ nullable: true })
	fileUrl: string;

	@ManyToOne(() => Comment, (comment) => comment, { nullable: true })
	mentionComment: Comment;

	@Column({ nullable: true })
	reviewStatus: ReviewStatus;

	@Column({ nullable: true })
	reviewRewardedBounty: number;
}

export default Comment;
