import { CreateComementDto, ReviewCommentDto } from "../dto/comment.dto";
import Comment from "../entity/comment.entity";
import Employee from "../entity/employee.entity";
import Task from "../entity/task.entity";
import HttpException from "../exceptions/http.exceptions";
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
		const comment = await this.commentRepository.findOneBy({ id });
		if (!comment) {
			throw new HttpException(404, "Comment not found");
		}
		return comment;
	};

	createComment = async (taskId: number, employee: Employee, commentDto: CreateComementDto) => {
		//TODO:'Create comment business logic'

		const newComment = new Comment();
		const { commentType, content, fileUrl, mentionCommentId } = commentDto;
		const task = await taskService.getTaskById(taskId);
		const mentionComment = mentionCommentId ? await this.getCommentByCommentId(mentionCommentId) : null;
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

	reviewComment = async (id: number, commentDto: ReviewCommentDto) => {
		//TODO:'Update comment business logic'
		const comment = await this.getCommentByCommentId(id);
		if (comment.commentType != CommentType.Review) {
			throw new HttpException(400, "Only review comments can be reviewed");
		}
		const { reviewStatus, reviewRewardBounty } = commentDto;
		comment.reviewStatus = reviewStatus;
		if (reviewStatus === ReviewStatus.ACCEPTED) {
			if (!reviewRewardBounty) {
				throw new HttpException(400, "Bounty percentage should be awarded for approved reviews");
			}
			comment.reviewRewardedBounty = reviewRewardBounty;
		}
		return this.commentRepository.update(id, comment);
	};
}

export default CommentService;

//Testing
