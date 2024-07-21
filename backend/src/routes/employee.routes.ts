import EmployeeController from "../controller/employee.controller";
import dataSource from "../db/dataSource.db";
import Employee from "../entity/employee.entity";
import Task from "../entity/task.entity";
import TaskParticipants from "../entity/taskParticipants.entity";
import EmployeeRepository from "../repository/employee.repository";
import TaskRepository from "../repository/task.repository";
import TaskParticipantRepository from "../repository/taskParticipant.repository";
import EmployeeService from "../service/employee.service";
import TaskService from "../service/task.service";
import TaskParticipantService from "../service/taskParticipant.service";
import { taskService } from "./task.routes";

const taskParticipantService = new TaskParticipantService(
	new TaskParticipantRepository(dataSource.getRepository(TaskParticipants))
);
const employeeService = new EmployeeService(
	new EmployeeRepository(dataSource.getRepository(Employee)),
	taskService,
	taskParticipantService
);
const employeeController = new EmployeeController(employeeService);
const employeeRouter = employeeController.router;

export { employeeRouter as default, employeeService, taskParticipantService };
