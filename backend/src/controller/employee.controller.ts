import { NextFunction, Request, Response, Router } from "express";
import EmployeeService from "../service/employee.service";
import { RequestWithRole } from "../utils/requestWithRole";
import HttpException from "../exceptions/http.exceptions";
import { Role } from "../utils/role.enum";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateEmployeeDto } from "../dto/employee.dto";
import getValidationErrorConstraints from "../utils/validationErrorConstraints";
class EmployeeController {
	public router: Router;
	constructor(private employeeService: EmployeeService) {
		this.router = Router();
		this.router.get("/", this.getAllEmployees);
		this.router.get("/:id", this.getEmployeeByID);
		this.router.get("/tasks", this.getEmployeeAssignedTasks);
		this.router.post("/login", this.loginEmployee);
		this.router.post("/", this.createEmployee);
	}

	public getAllEmployees = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const employees = await this.employeeService.getAllEmployees();
			res.status(200).send(employees);
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

			res.status(200).send(employee);
		} catch (error) {
			next(error);
		}
	};
	public getEmployeeAssignedTasks = async (req: RequestWithRole, res: Response, next: NextFunction) => {
		try {
			const employeeID = parseInt(req.params.id);
			if (!employeeID) {
				throw new HttpException(400, "Employee ID should be an integer!");
			}
			const employeeAssignedTasks = this.employeeService.getEmployeeTasksByID(employeeID);

			res.status(200).send(employeeAssignedTasks);
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
			const token = this.employeeService.loginEmployee(email, password);
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
			const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
			const errors = await validate(employeeDto);
			// const validationErrorConstraints = getValidationErrorConstraints(errors);
			if (errors.length > 0) {
				throw new HttpException(403, "Validation Error", errors);
			}
			const createdEmployee = this.employeeService.createEmployee(employeeDto);

			res.status(201).send(createdEmployee);
		} catch (error) {
			next(error);
		}
	};
}

export default EmployeeController;
