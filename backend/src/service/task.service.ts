import { CreateTaskDto } from "../dto/task.dto";
import Employee from "../entity/employee.entity";
import Task from "../entity/task.entity";
import TaskRepository from "../repository/task.repository";

class TaskService {
	constructor(private taskRepository: TaskRepository) {}

	getAllTasks = async (relations?:Array<string>): Promise<Task[]> => {
		return this.taskRepository.find({},relations);
	};

	// getAllTasksWithRelations = async (relations: Array<string>): Promise<Task[]> => {
	// 	return this.taskRepository.findWithRelations(relations);
	// }

	getTaskById = async (id: number) => {
		return this.taskRepository.findOneBy({ id });
	};

	createTask = async (task: CreateTaskDto,user:Employee) => {
		let newTask = new Task();
		newTask.title = task.title;
		newTask.description = task.description;
		// newTask.status = task.status;
		newTask.createdBy = user;
		newTask.maxParticipants = task.maxParticipants;
		newTask.currentParticipants = task.currentParticipants;
		newTask.totalBounty = task.totalBounty;
		newTask.startDate = task.startDate;
		newTask.deadLine = task.deadLine;

		await this.taskRepository.save(newTask);
	};

	updateTask = async (id: number, task: Partial<Task>) => {
		return this.taskRepository.update(id, task);
	}

	getTaskCreatedByUser = async (id:number) => {
		return this.taskRepository.find({createdById:id});
	}
}

export default TaskService;
