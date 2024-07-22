import { NextFunction, Response, Router } from "express";
import TaskService from "../service/task.service";
import { RequestWithRole } from "../utils/requestWithRole";
import CommentService from "../service/comment.service";
import { CommentType } from "../utils/commentType.enum";
import { plainToInstance } from "class-transformer";
import { CreateComementDto, ReviewCommentDto } from "../dto/comment.dto";
import { validate } from "class-validator";
import HttpException from "../exceptions/http.exceptions";
import { CreateTaskDto } from "../dto/task.dto";

class TaskController {
	public router: Router;
	constructor(private taskService: TaskService, private commentService: CommentService) {
		this.router = Router();
		this.router.get("/", this.getAllTasks);
		this.router.get("/created", this.getTaskCreatedByUser);
		this.router.post("/", this.createTask);
		this.router.get("/:taskId", this.getTaskById);
		// this.router.use("/:taskId/comments", commentRouter);
		this.router.get("/:taskId/comments", this.getAllTaskComments);
		this.router.get("/comments/:commentId", this.getCommentById);
		this.router.post("/:taskId/comments", this.createComment);
		this.router.patch("/comments/:commentId", this.reviewComment);
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
			const tasks = await this.taskService.getTaskCreatedByUser(req.user.id);
			res.status(200).json({
				success: true,
				message: "Tasks fetched successfully",
				data: tasks,
			});
		} catch (error) {
			next(error);
		}
	};

	public getTaskById = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { taskId } = req.params;
			const tasks = await this.taskService.getTaskById(parseInt(taskId));
			res.status(200).json({
				success: true,
				message: "Tasks fetched successfully",
				data: tasks,
			});
		} catch (error) {
			next(error);
		}
	};

	public createTask = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			console.log(req.body);
			
			const task = req.body;
			const taskDto = plainToInstance(CreateTaskDto, task);
			const errors = await validate(taskDto);
			if (errors.length) {
				// TODO: send individual errors
				throw new HttpException(400, "ValidationError", errors);
			}
			await this.taskService.createTask(taskDto, req.user);
			res.status(200).json({
				success: true,
				message: "Tasks created successfully",
			});
		} catch (error) {
			console.log(error);
			
			next(error);
		}
	};

	public getAllTaskComments = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { taskId } = req.params;
			const allComments = await this.taskService.getTaskCommentsById(parseInt(taskId));

			res.status(200).json({
				success: true,
				message: "Comments fetched succesfully",
				data: allComments,
			});
		} catch (error) {
			next(error);
		}
	};

	public getCommentById = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { commentId } = req.params;

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
			console.log(taskId);
			const employee = req.user;
			const comment = req.body;
			const commentDto = plainToInstance(CreateComementDto, comment);
			const errors = await validate(commentDto);
			if (errors.length) {
				// TODO: send error list
				throw new HttpException(400, "Validation Error", errors);
			}
			console.log("here");
			const response = await this.commentService.createComment(parseInt(taskId), employee, commentDto);

			res.status(201).json({
				success: true,
				message: "Comment created succesfully",
				response,
			});
		} catch (error) {
			next(error);
		}
	};

	public reviewComment = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { commentId } = req.params;
			const commentReview = req.body;
			const commentReviewDto = plainToInstance(ReviewCommentDto, commentReview);
			const errors = await validate(commentReviewDto);
			if (errors.length) {
				// TODO: send error list
				throw new HttpException(400, "Validation Error", errors);
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
}

export default TaskController;
