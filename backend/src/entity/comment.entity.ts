import { Column, Entity, ManyToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Task from "./task.entity";
import TaskParticipants from "./taskParticipants.entity";

@Entity()
class Comment extends AbstractEntity {
	@ManyToOne(() => Task, (task) => task.comments)
	task: Task;

	@ManyToOne(() => TaskParticipants, (taskParticipants) => taskParticipants.comments)
	taskParticipant: TaskParticipants;

	@Column()
	commentType: CommentType;

	@Column()
	content: string;

	@Column()
	fileUrl: string;

	@ManyToOne(() => Comment, (comment) => comment)
	mentionComment: Comment;
}

export default Comment;
