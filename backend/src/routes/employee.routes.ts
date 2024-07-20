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

const employeeService = new EmployeeService(
	new EmployeeRepository(dataSource.getRepository(Employee)),
	new TaskService(new TaskRepository(dataSource.getRepository(Task))),
	new TaskParticipantService(new TaskParticipantRepository(dataSource.getRepository(TaskParticipants)))
);
const employeeController = new EmployeeController(employeeService);
const employeeRouter = employeeController.router;

export default employeeRouter;
export { employeeService };
