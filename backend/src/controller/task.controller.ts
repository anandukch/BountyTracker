import { NextFunction, Response, Router } from "express";
import TaskService from "../service/task.service";
import { RequestWithRole } from "../utils/requestWithRole";
import authorize from "../middleware/authorize.middleware";

class TaskController {
	public router: Router;
	constructor(private taskService: TaskService) {
		this.router = Router();
		this.router.get("/", authorize, this.getAllTasks);
		this.router.get("/created", authorize, this.getTaskCreatedByUser);
		this.router.get("/:id", this.getTaskById);
		this.router.post("/", authorize, this.createTask);
	}

	public getAllTasks = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const tasks = await this.taskService.getAllTasks();
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
			const { id } = req.params;
			const tasks = await this.taskService.getTaskById(parseInt(id));
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
			// const task = req.body;
			//extract task form req.body and add req.user to task inthe creadedBy field
			const task = req.body;
			await this.taskService.createTask(task, req.user);
			res.status(200).json({
				success: true,
				message: "Tasks created successfully",
			});
		} catch (error) {
			next(error);
		}
	};
}

export default TaskController;
