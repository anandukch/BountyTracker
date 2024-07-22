import TaskController from "../controller/task.controller";
import dataSource from "../db/dataSource.db";
import Comment from "../entity/comment.entity";
import Task from "../entity/task.entity";
import CommentRepository from "../repository/comment.repository";
import TaskRepository from "../repository/task.repository";
import CommentService from "../service/comment.service";
import TaskService from "../service/task.service";

const taskService = new TaskService(new TaskRepository(dataSource.getRepository(Task)));
const commentService = new CommentService(new CommentRepository(dataSource.getRepository(Comment)));
const taskController = new TaskController(taskService, commentService);
const taskRouter = taskController.router;

export { taskRouter as default, commentService, taskService };
