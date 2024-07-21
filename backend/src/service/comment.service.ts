import { CreateComementDto, UpdateCommentDto } from "../dto/comment.dto";
import Comment from "../entity/comment.entity";
import Employee from "../entity/employee.entity";
import Task from "../entity/task.entity";
import CommentRepository from "../repository/comment.repository";
import { taskParticipantService } from "../routes/employee.routes";
import { taskService } from "../routes/task.routes";
import { CommentType } from "../utils/commentType.enum";
import ReviewStatus from "../utils/reviewStatus.enum";

class CommentService {
	constructor(private commentRepository: CommentRepository) {}

	getAllCommentsByTaskId = async (task: Task): Promise<Comment[]> => {
		return this.commentRepository.findBy({ task });
	};

	getCommentByCommentId = async (id: number) => {
		return this.commentRepository.findOneBy({ id });
	};

	createComment = async (taskId: number, employee: Employee, commentDto: CreateComementDto) => {
		//TODO:'Create comment business logic'

		const newComment = new Comment();
		const { commentType, content, fileUrl, mentionCommentId } = commentDto;
		const task = await taskService.getTaskById(taskId);
		const mentionComment = mentionCommentId ? await this.getCommentByCommentId(parseInt(mentionCommentId)) : null;
		newComment.task = task;
		newComment.commentType = commentType;
		newComment.content = content;
		newComment.fileUrl = fileUrl;
		newComment.mentionComment = mentionComment;
		newComment.reviewStatus = commentType === CommentType.Review ? ReviewStatus.PENDING : null;
		newComment.employee = employee;

		// newComment = comment as Comment;
		return this.commentRepository.save(newComment);
	};

	updateComment = async (id: number, comment: UpdateCommentDto) => {
		//TODO:'Update comment business logic'
	};
}

export default CommentService;

//Testing
