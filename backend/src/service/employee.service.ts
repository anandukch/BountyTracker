import { CreateEmployeeDto } from "../dto/employee.dto";
import Employee from "../entity/employee.entity";
import Task from "../entity/task.entity";
import EntityNotFoundException from "../exceptions/entityNotFoundException";
import IncorrectPasswordException from "../exceptions/incorrectPasswordException";
import EmployeeRepository from "../repository/employee.repository";
import { jwtPayload } from "../utils/jwtPayload.type";
import TaskService from "./task.service";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import EmployeeDetails from "../entity/employeeDetails.entity";
import TaskParticipantService from "./taskParticipant.service";
class EmployeeService {
	constructor(
		private employeeRespository: EmployeeRepository,
		private taskService: TaskService,
		private taskParticipantService: TaskParticipantService
	) {}

	getAllEmployees = async (): Promise<Employee[]> => {
		return this.employeeRespository.find();
	};

	getEmployeeByEmail = async (email: string): Promise<Employee> => {
		return this.employeeRespository.findOneBy({ email });
	};
	getEmployeeByID = async (employeeID: number): Promise<Employee> => {
		return this.employeeRespository.findOneBy({ id: employeeID });
	};

	getEmployeeTasksByID = async (employeeID: number): Promise<Task[]> => {
		//TODO
		return;
	};

	loginEmployee = async (email: string, password: string): Promise<string> => {
		const employee = await this.employeeRespository.findOneBy({ email });
		if (!employee) {
			throw new EntityNotFoundException(404, "Email Not Found");
		}
		const result = await bcrypt.compare(password, employee.password);
		if (!result) {
			throw new IncorrectPasswordException(404, "Password is Incorrect");
		}
		const payload: jwtPayload = {
			name: employee.name,
			email: employee.email,
			role: employee.role,
		};
		const token = jsonwebtoken.sign(payload, JWT_SECRET, {
			expiresIn: JWT_VALIDITY,
		});

		return token;
	};

	createEmployee = async (employeeDto: CreateEmployeeDto): Promise<Employee> => {
		const employee = new Employee();
		employee.name = employeeDto.name;
		employee.email = employeeDto.email;
		employee.password = await bcrypt.hash(employeeDto.password, 10);
		employee.role = employeeDto.role;

		const newEmployeeDetails = new EmployeeDetails();
		newEmployeeDetails.gender = employeeDto.details.gender;
		newEmployeeDetails.birthday = new Date(employeeDto.details.birthday);
		newEmployeeDetails.phoneNo = employeeDto.details.phoneNo;
		newEmployeeDetails.totalBounty = employeeDto.details.totalBounty;
		employee.details = newEmployeeDetails;
		await this.employeeRespository.save(employee);
		return employee;
	};

	joinTask = async (taskId: number, employee: Employee) => {
		const task = await this.taskService.getTaskById(taskId);
		if (!task) {
			throw new EntityNotFoundException(404, "Task not found");
		}

		const taskParticipant =  await this.taskParticipantService.create(task, employee);
		
		return taskParticipant
	};
}

export default EmployeeService;
