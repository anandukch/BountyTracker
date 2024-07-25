import { NextFunction, Response, Router } from "express";
import TaskService from "../service/task.service";
import { RequestWithRole } from "../utils/requestWithRole";
import CommentService from "../service/comment.service";
import { CommentType } from "../utils/commentType.enum";
import { plainToInstance } from "class-transformer";
import { CreateComementDto, ReviewCommentDto } from "../dto/comment.dto";
import { validate } from "class-validator";
import HttpException from "../exceptions/http.exceptions";
import { CreateTaskDto, UpdateTaskDto } from "../dto/task.dto";
import ValidationException from "../exceptions/validationException";
import fileUploadMiddleware from "../middleware/fileUploadMiddleware";
import validationMiddleware from "../middleware/validate.middleware";
import { compareDates } from "../utils/date.utils";
import { TaskStatusEnum } from "../utils/taskStatus.enum";
import authorize from "../middleware/authorize.middleware";

class TaskController {
	public router: Router;
	constructor(private taskService: TaskService, private commentService: CommentService) {
		this.router = Router();
		this.router.get("/", authorize(), this.getAllTasks);
		this.router.get("/created", authorize(), this.getTaskCreatedByUser);
		this.router.post("/", authorize(), validationMiddleware(CreateTaskDto), this.createTask);
		this.router.get("/:taskId", authorize(), this.getTaskById);
		this.router.get("/:taskId/comments", authorize(), this.getAllTaskComments);
		this.router.get("/comments/:commentId", authorize(), this.getCommentById);
		this.router.get("/comments/:commentId/file", this.getCommentFile);
		this.router.post("/:taskId/comments", authorize(), fileUploadMiddleware.single("file"), this.createComment);
		this.router.patch("/comments/:commentId", authorize(), this.reviewComment);
		this.router.patch("/:taskId", authorize(), this.updateTask);
		this.router.patch("/complete/:taskId", authorize(), this.completeTask);
		this.router.get("/:id/contributions", authorize(), this.getTaskContributions);
	}

	public getTaskContributions = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const taskContributions = await this.taskService.getContributions(parseInt(req.params.id));
			res.status(200).json({
				success: true,
				message: "Contributions fetched successfully",
				data: {
					name: taskContributions.title,
					description: taskContributions.description,
					id: taskContributions.id,
					totalBounty: taskContributions.totalBounty,
					participants: taskContributions.participants.map((participant) => {
						return {
							id: participant.employee.id,
							name: participant.employee.name,
							email: participant.employee.email,
							contributions: participant.employee.comments,
						};
					}),
				},
			});
		} catch (error) {
			next(error);
		}
	};
	public getAllTasks = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const tasks = await this.taskService.getTasks(
				{
					// status: TaskStatusEnum.IN_PROGRESS,
				},
				["createdBy"]
			);
			res.status(200).json({
				success: true,
				message: "Tasks fetched successfully",
				data: tasks,
			});
		} catch (error) {
			next(error);
		}
	};

	public getTaskCreatedByUser = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const tasks = await this.taskService.getTaskCreatedByUser(req.user.id, ["comments", "createdBy"]);

			const data = tasks.map((task, i) => {
				let deadLine = task.deadLine;
				let today = new Date();
				if (task.status !== TaskStatusEnum.COMPLETED) {
					if (compareDates(today, deadLine) > 0) {
						task.status = TaskStatusEnum.IN_REVIEW;
					} else {
						task.status = TaskStatusEnum.IN_PROGRESS;
					}
				}

				return task;
			});
			res.status(200).json({
				success: true,
				message: "Tasks fetched successfully",
				data: data,
			});
		} catch (error) {
			next(error);
		}
	};

	public getTaskById = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { taskId } = req.params;
			if (!taskId || isNaN(parseInt(taskId))) {
				throw new HttpException(400, "Task not found");
			}
			const task = await this.taskService.getTaskById(parseInt(taskId), [
				"createdBy",
				"comments",
				"participants",
				"participants.employee",
			]);

			if (!task) {
				throw new HttpException(404, "Task not found");
			}

			res.status(200).json({
				success: true,
				message: "Tasks fetched successfully",
				data: {
					...task,
					createdBy: {
						name: task.createdBy.name,
						email: task.createdBy.email,
						role: task.createdBy.role,
					},
					participants: task.participants.map((participant) => {
						return {
							id: participant.employee.id,
							name: participant.employee.name,
							email: participant.employee.email,
							contribution: participant.contribution,
						};
					}),
				},
			});
		} catch (error) {
			next(error);
		}
	};

	public createTask = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			await this.taskService.createTask(req.body as CreateTaskDto, req.user);
			res.status(200).json({
				success: true,
				message: "Tasks created successfully",
			});
		} catch (error) {

			next(error);
		}
	};

	public completeTask = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { taskId } = req.params;
			if (!taskId) {
				throw new HttpException(400, "Task not found");
			}
			const participantContributions = req.body.participantContributions;

			const response = await this.taskService.completeTask(parseInt(taskId), participantContributions);
			res.status(200).json({
				success: true,
				message: "Task completed succesfully",
				data: response,
			});
		} catch (error) {
			next(error);
		}
	};

	// Comments

	public getAllTaskComments = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { taskId } = req.params;
			if (!taskId) {
				throw new HttpException(400, "Task not found");
			}
			const allComments = await this.commentService.getAllCommentsByTaskId(parseInt(taskId), req.user.id);

			// const normalComments = allComments.filter((comment) => comment.commentType === CommentType.Normal);
			// const reviewComments = allComments.filter((comment) => comment.commentType === CommentType.Review);

			res.status(200).json({
				success: true,
				message: "Comments fetched succesfully",
				data: allComments.sort((a, b) => {
					return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
				}),
			});
		} catch (error) {
			next(error);
		}
	};

	public getCommentById = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { commentId } = req.params;

			if (!commentId) {
				throw new HttpException(400, "Comment not found");
			}

			const comment = await this.commentService.getCommentByCommentId(parseInt(commentId));

			res.status(201).json({
				success: true,
				message: "Comment fetched succesfully",
				data: comment,
			});
		} catch (error) {
			next(error);
		}
	};

	public createComment = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { taskId } = req.params;

			const employee = req.user;
			const comment = req.body;
			const commentDto = plainToInstance(CreateComementDto, comment);
			const errors = await validate(commentDto);
			if (errors.length) {
				throw new ValidationException(400, "Validation Failed", errors);
			}

			const fileName = req.file ? req.file.filename : null;

			await this.commentService.createComment(parseInt(taskId), employee, commentDto, fileName);

			res.status(201).json({
				success: true,
				message: "Comment created succesfully",
				// response,
			});
		} catch (error) {
			next(error);
		}
	};

	public reviewComment = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { commentId } = req.params;
			if (!commentId) {
				throw new HttpException(400, "Comment not found");
			}
			const commentReview = req.body;
			const commentReviewDto = plainToInstance(ReviewCommentDto, commentReview);
			const errors = await validate(commentReviewDto);
			if (errors.length) {
				throw new ValidationException(400, "Validation Failed", errors);
			}
			const response = await this.commentService.reviewComment(parseInt(commentId), commentReviewDto);
			res.status(200).json({
				success: true,
				message: "Comment reviewed succesfully",
				data: response,
			});
		} catch (error) {
			next(error);
		}
	};

	public updateTask = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { taskId } = req.params;
			if (!taskId) {
				throw new HttpException(400, "Task not found");
			}
			const updatedTask = req.body;
			const updatedTaskDto = plainToInstance(UpdateTaskDto, updatedTask);
			const errors = await validate(updatedTaskDto);
			if (errors.length) {
				throw new ValidationException(400, "Validation Failed", errors);
			}
			const response = await this.taskService.updateTask(parseInt(taskId), updatedTaskDto);
			res.status(200).json({
				success: true,
				message: "Task updated succesfully",
				data: response,
			});
		} catch (error) {
			next(error);
		}
	};

	public getCommentFile = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { commentId } = req.params;
			const file = await this.commentService.getCommentFile(parseInt(commentId));
			res.sendFile(file);
		} catch (error) {}
	};
}

export default TaskController;
