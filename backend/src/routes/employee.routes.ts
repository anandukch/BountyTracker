import EmployeeController from "../controller/employee.controller";
import dataSource from "../db/dataSource.db";
import Employee from "../entity/employee.entity";
import Task from "../entity/task.entity";
import EmployeeRepository from "../repository/employee.repository";
import TaskRepository from "../repository/task.repository";
import EmployeeService from "../service/employee.service";
import TaskService from "../service/task.service";

const employeeController = new EmployeeController(
	new EmployeeService(
		new EmployeeRepository(dataSource.getRepository(Employee)),
		new TaskService(new TaskRepository(dataSource.getRepository(Task)))
	)
);
const employeeRouter = employeeController.router;

export default employeeRouter;
