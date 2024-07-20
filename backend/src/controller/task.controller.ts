import { NextFunction, Response, Router } from "express";
import TaskService from "../service/task.service";
import { RequestWithRole } from "../utils/requestWithRole";

class TaskController {
	public router: Router;
	constructor(private taskService: TaskService) {
		this.router = Router();
		this.router.get("/", this.getAllTasks);
		this.router.get("/:id", this.getTaskById);
		this.router.post("/", this.createTask);
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
			const task = req.body;
			console.log(task);

			const tasks = await this.taskService.createTask(task);
			res.status(200).json({
				success: true,
				message: "Tasks fetched successfully",
				data: tasks,
			});
		} catch (error) {
			next(error);
		}
	};
}

export default TaskController;
