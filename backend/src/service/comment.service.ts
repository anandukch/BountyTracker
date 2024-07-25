import path from "path";
import { CreateComementDto, HrRequestDto, ReviewCommentDto } from "../dto/comment.dto";
import Comment from "../entity/comment.entity";
import Employee from "../entity/employee.entity";
import Task from "../entity/task.entity";
import HttpException from "../exceptions/http.exceptions";
import CommentRepository from "../repository/comment.repository";
import { employeeService, taskParticipantService } from "../routes/employee.routes";
import { taskService } from "../routes/task.routes";
import { CommentType } from "../utils/commentType.enum";
import ReviewStatus from "../utils/reviewStatus.enum";

class CommentService {
	constructor(private commentRepository: CommentRepository) {}

	getAllCommentsByTaskId = async (taskId: number, userId: number): Promise<Comment[]> => {
		const comments = await this.commentRepository.find({ task: { id: taskId } as any }, [
			"employee",
			"mentionComment",
			"mentionComment.employee",
		]);

		const task = await taskService.getTaskById(taskId, ["participants", "participants.employee", "createdBy"]);
		const isUserCreator = task.createdBy.id === userId;
		const isParticipant = task.participants.some((participant) => participant.employee.id === userId);
		if (!isUserCreator && !isParticipant) {
			return [];
		}
		return comments;
	};

	getCommentByCommentId = async (id: number) => {
		const comment = await this.commentRepository.findOneBy(
			{ id },

			["mentionComment", "employee", "task"]
		);
		if (!comment) {
			throw new HttpException(404, "Comment not found");
		}

		return comment;
	};

	getCommentFile = async (commentId: number) => {
		const comment = await this.getCommentByCommentId(commentId);
		const fileName = comment.fileUrl;
		const file = path.resolve(__dirname, `../../uploads/${fileName}`);
		return file;
	};

	createComment = async (taskId: number, employee: Employee, commentDto: CreateComementDto, fileName: string) => {
		const newComment = new Comment();
		const { commentType, content, fileUrl, mentionCommentId } = commentDto;
		const task = await taskService.getTaskById(taskId, [
			"createdBy",
			"comments",
			"participants",
			"participants.employee",
		]);
		const mentionComment = mentionCommentId ? await this.getCommentByCommentId(mentionCommentId) : null;
		newComment.task = task;
		newComment.commentType = commentType;
		newComment.content = content;
		newComment.fileUrl = fileName;
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
		} else if (comment.commentType != CommentType.Review) {
			throw new HttpException(400, "Cannot change already accepted review");
		}

		if (comment.reviewStatus === ReviewStatus.ACCEPTED) {
			throw new HttpException(400, "Cannot change already accepted review");
		}
		const { reviewStatus, reviewRewardBounty } = commentDto;
		comment.reviewStatus = reviewStatus;
		// if (reviewStatus === ReviewStatus.ACCEPTED) {
		// 	if (!reviewRewardBounty) {
		// 		throw new HttpException(400, "Bounty percentage should be awarded for approved reviews");
		// 	}
		// 	comment.reviewRewardedBounty = reviewRewardBounty;
		// 	const updatedPoints = comment.task.currentContribution
		// 		? comment.task.currentContribution + reviewRewardBounty
		// 		: reviewRewardBounty;
		// 	await taskService.updateTask(comment.task.id, { currentContribution: updatedPoints });
		// 	await employeeService.giveContribution(comment.task.id, comment.employee.id, reviewRewardBounty);
		// }

		return this.commentRepository.update(id, comment);
	};

	getUserTaskReviewComments = async (employeeId: number, taskId: number) => {
		const comments = await this.commentRepository.find({
			employee: { id: employeeId },
			task: { id: taskId } as any,

			commentType: CommentType.Review,
		});
		return comments;
	};

	hrRequestComment = async (employee: Employee) => {
		const newComment = new Comment();
		newComment.content = `Redeem Request by : #${employee.id} : ${employee.name} `;
		newComment.commentType = CommentType.Redeem;
		newComment.reviewStatus = ReviewStatus.REWARD;
		newComment.employee = employee;
		return this.commentRepository.save(newComment);
	};

	getRewardComment = async () => {
		const comments = await this.commentRepository.find({ reviewStatus: ReviewStatus.REWARD as any }, [
			"employee",
			"employee.details",
		]);

		return comments;
	};
	deleteCommentByID = async (id: number) => {
		const comment = await this.commentRepository.findOneBy({ id });
		return this.commentRepository.softDelete(comment)
	};
}

export default CommentService;
