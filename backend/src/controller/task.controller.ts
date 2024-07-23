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

class TaskController {
	public router: Router;
	constructor(private taskService: TaskService, private commentService: CommentService) {
		this.router = Router();
		this.router.get("/", this.getAllTasks);
		this.router.get("/created", this.getTaskCreatedByUser);
		this.router.post("/", validationMiddleware(CreateTaskDto), this.createTask);
		this.router.get("/:taskId", this.getTaskById);
		// this.router.use("/:taskId/comments", commentRouter);
		this.router.get("/:taskId/comments", this.getAllTaskComments);
		this.router.get("/comments/:commentId", this.getCommentById);
		this.router.get("/comments/:commentId/file", this.getCommentFile);
		this.router.post("/:taskId/comments", fileUploadMiddleware.single("file"), this.createComment);
		this.router.patch("/comments/:commentId", this.reviewComment);
		this.router.patch("/:taskId", this.updateTask);
		this.router.patch("/complete/:taskId", this.completeTask);
	}

	public getAllTasks = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const tasks = await this.taskService.getAllTasks(["createdBy"]);
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
			const tasks = await this.taskService.getTaskCreatedByUser(req.user.id, ["comments"]);

			const data = tasks.map((task, i) => {
				let startDate = task.startDate;
				let deadLine = task.deadLine;
				let today = new Date();

				if (compareDates(today, startDate) >= 0 && compareDates(today, deadLine) <= 0) {
					task.status = TaskStatusEnum.IN_PROGRESS;
				} else if (compareDates(today, deadLine) > 0 && task.status !== TaskStatusEnum.COMPLETED) {
					task.status = TaskStatusEnum.IN_REVIEW;
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
			if (!taskId) {
				throw new HttpException(400, "Task not found");
			}
			const task = await this.taskService.getTaskById(parseInt(taskId), [
				"createdBy",
				"comments",
				"participants",
				"participants.employee",
			]);
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
			console.log(error);

			next(error);
		}
	};

	public completeTask = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { taskId } = req.params;
			if (!taskId) {
				throw new HttpException(400, "Task not found");
			}
			const response = await this.taskService.completeTask(parseInt(taskId));
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
			const allComments = await this.commentService.getAllCommentsByTaskId(parseInt(taskId));

			const normalComments = allComments.filter((comment) => comment.commentType === CommentType.Normal);
			const reviewComments = allComments.filter((comment) => comment.commentType === CommentType.Review);

			res.status(200).json({
				success: true,
				message: "Comments fetched succesfully",
				data: {
					normalComments,
					reviewComments,
				},
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
			console.log("filename", fileName);

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
			console.log(taskId);
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
