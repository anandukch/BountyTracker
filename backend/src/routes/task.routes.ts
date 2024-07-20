import TaskController from "../controller/task.controller";
import dataSource from "../db/dataSource.db";
import Task from "../entity/task.entity";
import TaskRepository from "../repository/task.repository";
import TaskService from "../service/task.service";

const taskController = new TaskController(new TaskService(new TaskRepository(dataSource.getRepository(Task))));
const taskRouter = taskController.router;

export default taskRouter;
