import TaskController from "../controller/task.controller";
import dataSource from "../db/dataSource.db";
import Comment from "../entity/comment.entity";
import Task from "../entity/task.entity";
import CommentRepository from "../repository/comment.repository";
import TaskRepository from "../repository/task.repository";
import CommentService from "../service/comment.service";
import TaskService from "../service/task.service";

const taskController = new TaskController(
	new TaskService(new TaskRepository(dataSource.getRepository(Task))),
	new CommentService(new CommentRepository(dataSource.getRepository(Comment)))
);
const taskRouter = taskController.router;

export default taskRouter;
