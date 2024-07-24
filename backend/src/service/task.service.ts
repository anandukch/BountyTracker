import { CreateTaskDto, ResponseTaskDto, UpdateTaskDto } from "../dto/task.dto";
import Employee from "../entity/employee.entity";
import Task from "../entity/task.entity";
import HttpException from "../exceptions/http.exceptions";
import ValidationException from "../exceptions/validationException";
import TaskRepository from "../repository/task.repository";
import { employeeService } from "../routes/employee.routes";
import { commentService } from "../routes/task.routes";
import { CommentType } from "../utils/commentType.enum";
import ReviewStatus from "../utils/reviewStatus.enum";
import { TaskStatusEnum } from "../utils/taskStatus.enum";
import EmployeeService from "./employee.service";

class TaskService {
	constructor(private taskRepository: TaskRepository) {}

	getAllTasks = async (relations?: Array<string>): Promise<Task[]> => {
		return this.taskRepository.find({}, relations);
	};

	getTasks = async (filter: Partial<Task>, relations: Array<string>) => {
		return this.taskRepository.find(filter, relations);
	};
	getTaskById = async (id: number, relations?: Array<string>) => {
		const task = await this.taskRepository.findOneBy({ id }, relations);
		if (!task) {
			throw new HttpException(404, "Task not found");
		}
		return task;
	};

	createTask = async (task: CreateTaskDto, user: Employee) => {
		let newTask = new Task();
		const { title, description, maxParticipants, totalBounty, deadLine, skills } = task;
		if (new Date() > deadLine) {
			throw new HttpException(400, "due date cannot be before current date");
		}
		newTask.title = title;
		newTask.description = description;
		newTask.status = TaskStatusEnum.IN_PROGRESS;
		newTask.createdBy = user;
		newTask.maxParticipants = maxParticipants;
		newTask.currentParticipants = 0;
		newTask.currentContribution = 0;
		newTask.totalBounty = totalBounty;
		newTask.deadLine = deadLine;
		newTask.skills = skills;
		await this.taskRepository.save(newTask);
	};

	updateTask = async (id: number, task: Partial<Task>) => {
		// const existingTask = await this.taskRepository.findOneBy({ id });
		// console.log(existingTask);
		// existingTask.status = task.status;
		// existingTask.currentParticipants = task.currentParticipants;
		return this.taskRepository.update(id, task);
	};

	getTaskCreatedByUser = async (id: number, relations?: Array<string>) => {
		const tasks = await this.taskRepository.find({ createdById: id }, relations);

		const updatedTask = tasks.map((task) => {
			let reviewCommentCount = 0;
			task.comments.forEach((comment) => {
				if (comment.reviewStatus == "PENDING") reviewCommentCount++;
			});
			delete task.comments;
			return { ...task, reviewCommentCount };
		});
		return updatedTask;
	};

	completeTask = async (id: number) => {
		const task = await this.taskRepository.findOneBy({ id }, ["comments", "participants", "participants.employee"]);
		if (!task) {
			throw new HttpException(404, "Task not found");
		}
		if (task.status === TaskStatusEnum.COMPLETED) {
			throw new HttpException(400, "Task already completed");
		}
		const comments = task.comments.filter((comment) => comment.reviewStatus === ReviewStatus.PENDING);
		if (comments.length > 0) {
			throw new HttpException(400, "Cannot complete task with pending comments");
		}
		const participants = task.participants;

		await Promise.all(
			participants.map(async (participant) => {
				const employee = participant.employee;
				const contribution = participant.contribution;
				await employeeService.updateBounty(employee.id, contribution);
			})
		);

		task.status = TaskStatusEnum.COMPLETED;
		await this.taskRepository.save(task);
	};

	getContributions = async (id: number) => {
		const task = await this.taskRepository.findOneBy({ id }, [
			"participants",
			"participants.employee",
			"participants.employee.comments",
		]);
		if (!task) {
			throw new HttpException(404, "Task not found");
		}

		await Promise.all(
			task.participants.map(async (participant) => {
				const employee = participant.employee;
				const comment = await commentService.getUserTaskReviewComments(employee.id, id);
				participant.employee.comments = comment;
				return participant;
			})
		);

		return task;
	};
}

export default TaskService;
