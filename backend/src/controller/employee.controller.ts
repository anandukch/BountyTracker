import { NextFunction, Request, Response, Router } from "express";
import EmployeeService from "../service/employee.service";
import { RequestWithRole } from "../utils/requestWithRole";
import HttpException from "../exceptions/http.exceptions";
import { Role } from "../utils/role.enum";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateEmployeeDto } from "../dto/employee.dto";
import getValidationErrorConstraints from "../utils/validationErrorConstraints";
import authorize from "../middleware/authorize.middleware";
import ValidationException from "../exceptions/validationException";
import { compareDates } from "../utils/date.utils";
import { TaskStatusEnum } from "../utils/taskStatus.enum";
import validationMiddleware from "../middleware/validate.middleware";
import { CreateComementDto } from "../dto/comment.dto";
class EmployeeController {
	public router: Router;
	constructor(private employeeService: EmployeeService) {
		this.router = Router();
		this.router.get("/", authorize, this.getAllEmployees);
		this.router.get("/profile", authorize, this.getEmployeeProfile);
		this.router.get("/tasks", authorize, this.getEmployeeAssignedTasks);
		this.router.get("/tasks/not-joined", authorize, this.getTasksNotJoinedByEmployee);
		this.router.get("/:id", this.getEmployeeByID);
		this.router.post("/login", this.loginEmployee);
		this.router.post("/", validationMiddleware(CreateComementDto), this.createEmployee);
		this.router.post("/tasks/:id", authorize, this.joinTask);
		this.router.put("/:employeeId/tasks/:taskId/contributions", authorize, this.giveContribution);
	}

	public giveContribution = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const taskId = parseInt(req.params.taskId);
			const employeeId = parseInt(req.params.employeeId);
			const contribution = req.body.contribution;
			if (!taskId || !employeeId || !contribution) {
				throw new HttpException(400, "Task ID, Employee ID and Contribution should be an integer!");
			}

			await this.employeeService.giveContribution(taskId, employeeId, contribution);

			res.status(201).json({
				success: true,
				message: "Contribution added successfully",
			});
		} catch (error) {
			next(error);
		}
	};

	public getEmployeeProfile = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const employee = await this.employeeService.getProfile(req.user.id);
			res.status(200).json({
				success: true,
				message: "Employee fetched successfully",
				data: employee,
			});
		} catch (error) {
			next(error);
		}
	};

	public getAllEmployees = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const employees = await this.employeeService.getAllEmployees();
			res.status(200).json({
				success: true,
				message: "Employees fetched successfully",
				data: employees,
			});
		} catch (error) {
			next(error);
		}
	};

	public getEmployeeByID = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const employeeID = parseInt(req.params.id);
			if (!employeeID) {
				throw new HttpException(400, "Employee ID should be an integer!");
			}
			const employee = await this.employeeService.getEmployeeByID(employeeID);

			res.status(200).json({
				success: true,
				message: "Employee fetched successfully",
				data: employee,
			});
		} catch (error) {
			next(error);
		}
	};
	public getEmployeeAssignedTasks = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const participatingTasks = await this.employeeService.getEmployeeTasksByID(req.user.id);

			const data = participatingTasks.map((participatingTask) => {
				delete participatingTask.task.createdBy.password;
				let startDate = participatingTask.task.startDate;
				let deadLine = participatingTask.task.deadLine;
				let today = new Date();

				if (compareDates(today, startDate) >= 0 && compareDates(today, deadLine) <= 0) {
					participatingTask.task.status = TaskStatusEnum.IN_PROGRESS;
				} else if (
					compareDates(today, deadLine) > 0 &&
					participatingTask.task.status !== TaskStatusEnum.COMPLETED
				) {
					participatingTask.task.status = TaskStatusEnum.IN_REVIEW;
				}

				return {
					...participatingTask,
					task: {
						...participatingTask.task,
						createdBy: {
							name: participatingTask.task.createdBy.name,
							email: participatingTask.task.createdBy.email,
							role: participatingTask.task.createdBy.role,
						},
					},
				};
			});

			res.status(200).json({
				success: true,
				message: "Employee tasks fetched successfully",
				data: data,
			});
		} catch (error) {
			next(error);
		}
	};

	public loginEmployee = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				throw new HttpException(400, "Provide email and password!");
			}
			const token = await this.employeeService.loginEmployee(email, password);
			res.status(200).send({ token });
		} catch (error) {
			next(error);
		}
	};

	public createEmployee = async (req: Request, res: Response, next: NextFunction) => {
		try {
			// if (req.role > Role.LEAD) {
			//     throw new HttpException(403, "Access Denied");
			// }

			const createdEmployee = await this.employeeService.createEmployee(req.body as CreateEmployeeDto);
			delete createdEmployee.password;
			res.status(201).send(createdEmployee);
		} catch (error) {
			next(error);
		}
	};

	public joinTask = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const taskId = parseInt(req.params.id);
			if (!taskId) {
				throw new HttpException(400, "Task ID should be an integer!");
			}

			await this.employeeService.joinTask(taskId, req.user);

			res.status(201).json({
				success: true,
				message: "Task joined successfully",
			});
		} catch (error) {
			next(error);
		}
	};

	public getTasksNotJoinedByEmployee = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const tasks = await this.employeeService.getTaskNotJoined(req.user.id);
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

export default EmployeeController;
