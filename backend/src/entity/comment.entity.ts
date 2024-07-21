import { Column, Entity, ManyToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Task from "./task.entity";
import TaskParticipants from "./taskParticipants.entity";
import { CommentType } from "../utils/commentType.enum";
import ReviewStatus from "../utils/reviewStatus.enum";

@Entity()
class Comment extends AbstractEntity {
	@ManyToOne(() => Task, (task) => task.comments)
	task: Task;

	@ManyToOne(() => TaskParticipants, (taskParticipants) => taskParticipants)
	taskParticipant: TaskParticipants;

	@Column()
	commentType: CommentType;

	@Column()
	content: string;

	@Column()
	fileUrl: string;

	@ManyToOne(() => Comment, (comment) => comment)
	mentionComment: Comment;

	@Column({ nullable: true })
	reviewStatus: ReviewStatus;

	@Column({ nullable: true })
	reviewRewardedBounty: number;
}

export default Comment;
