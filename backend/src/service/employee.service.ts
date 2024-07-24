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
import { TaskStatusEnum } from "../utils/taskStatus.enum";
import { getCurrentTier, getReward } from "../utils/getTierAndReward.utils";
class EmployeeService {
	constructor(
		private employeeRespository: EmployeeRepository,
		private taskService: TaskService,
		private taskParticipantService: TaskParticipantService
	) {}

	getAllEmployees = async (relations?: Array<string>): Promise<Employee[]> => {
		const employeeList= await this.employeeRespository.find({}, relations)
		const updatedEmployeeList=[]
		employeeList.forEach((employee)=>{
			const currentTier = getCurrentTier(employee.details.totalBounty);
			updatedEmployeeList.push({...employee,currentTier})
		})
		return updatedEmployeeList;
	};

	getEmployeeByEmail = async (email: string): Promise<Employee> => {
		return this.employeeRespository.findOneBy({ email });
	};
	getEmployeeByID = async (employeeID: number): Promise<Employee> => {
		return this.employeeRespository.findOneBy({ id: employeeID }, ["details"]);
	};

	getEmployeeTasksByID = async (employeeID: number) => {
		const employee = await this.employeeRespository.findOneBy({ id: employeeID }, [
			"participatingTasks",
			"participatingTasks.task",
			"participatingTasks.task.createdBy",
		]);
		if (!employee) {
			throw new EntityNotFoundException("Employee not found");
		}
		return employee.participatingTasks;
	};

	getProfile = async (employeeID: number) => {
		const employee = await this.employeeRespository.findOneBy({ id: employeeID }, [
			"details",
			"participatingTasks",
			"participatingTasks.task",
		]);
		if (!employee) {
			throw new EntityNotFoundException("Employee not found");
		}

		let completedTasks = 0;
		let pendingTasks = 0;

		employee.participatingTasks.forEach((task) => {
			if (task.task.status === "Completed") {
				completedTasks++;
			} else {
				pendingTasks++;
			}
		});
		employee.participatingTasks = undefined;
		employee.password = undefined;
		const currentTier = getCurrentTier(employee.details.totalBounty);
		return {
			...employee,
			completedTasks,
			pendingTasks,
			currentTier,
		};
	};

	loginEmployee = async (email: string, password: string): Promise<string> => {
		const employee = await this.employeeRespository.findOneBy({ email });
		if (!employee) {
			throw new EntityNotFoundException("Email Not Found");
		}
		const result = await bcrypt.compare(password, employee.password);
		if (!result) {
			throw new IncorrectPasswordException("Password is Incorrect");
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
		newEmployeeDetails.gender = employeeDto.gender;
		newEmployeeDetails.birthday = new Date(employeeDto.birthday);
		newEmployeeDetails.phoneNo = employeeDto.phoneNo;
		newEmployeeDetails.totalBounty = 0;
		newEmployeeDetails.platinumCount = 0;
		newEmployeeDetails.rewards = 0;
		employee.details = newEmployeeDetails;
		return this.employeeRespository.save(employee);
	};

	joinTask = async (taskId: number, employee: Employee) => {
		const task = await this.taskService.getTaskById(taskId, ["createdBy"]);
		if (!task) {
			throw new EntityNotFoundException("Task not found");
		}
		if (task.maxParticipants === task.currentParticipants) {
			throw new EntityNotFoundException("Task is full");
		}
		if (task.createdBy.id === employee.id) {
			throw new EntityNotFoundException("Cannot join task created by self");
		}

		const alreadyJoined = await this.taskParticipantService.checkAlreadyJoined(taskId, employee.id);

		if (alreadyJoined) {
			throw new EntityNotFoundException("Task already joined");
		}

		task.currentParticipants += 1;
		const updatedTask = await this.taskService.updateTask(taskId, task);
		console.log(updatedTask);

		const taskParticipant = await this.taskParticipantService.create(task, employee);

		return taskParticipant;
	};

	getTaskNotJoined = async (employeeId: number) => {
		const tasks = await this.taskService.getAllTasks(["createdBy", "participants", "participants.employee"]);
		const tasksNotJoined = tasks.filter((task) => {
			return !task.participants.some((participant) => participant.employee.id === employeeId);
		});
		return tasksNotJoined;
	};

	giveContribution = async (taskId: number, employeeId: number, contribution: number) => {
		const task = await this.taskService.getTaskById(taskId, ["createdBy", "participants", "participants.employee"]);
		if (!task) {
			throw new EntityNotFoundException("Task not found");
		}

		const employee = await this.employeeRespository.findOneBy({
			id: employeeId,
		});

		if (!employee) {
			throw new EntityNotFoundException("Employee not found");
		}

		const taskParticipant = await this.taskParticipantService.getTask({
			taskId,
			employeeId,
		});
		if (!taskParticipant) {
			throw new EntityNotFoundException("Employee not found in task");
		}
		taskParticipant.contribution += contribution;
		await this.taskParticipantService.updateTaskParticipants(taskParticipant);
		return taskParticipant;
	};

	updateBounty = async (employeeId: number, bounty: number) => {
		const employee = await this.employeeRespository.findOneBy({ id: employeeId }, ["details"]);
		if (!employee) {
			throw new EntityNotFoundException("Employee not found");
		}

		// const newTier = checkIfNewTierReached(employee.details.totalBounty + bounty);
		const currentTier = getCurrentTier(employee.details.totalBounty);
		employee.details.totalBounty += bounty; // add awarded bounty
		const newTier = getCurrentTier(employee.details.totalBounty);

		if (currentTier !== newTier) {
			const reward = getReward(newTier);
			employee.details.rewards += reward;
		}
		if (newTier === "Platinum") {
			employee.details.platinumCount += 1;
			employee.details.totalBounty -= 2000; //reset Bounty on reaching Platinum
		}

		await this.employeeRespository.save(employee);
		return employee;
	};

	resetReward = async (employeeId: number) => {
		const employee = await this.employeeRespository.findOneBy({ id: employeeId }, ["details"]);
		if (!employee) {
			throw new EntityNotFoundException("Employee not found");
		}
		// TODO: After Migration
		// employee.details.rewards = 0;
		return;
	};
}

export default EmployeeService;
