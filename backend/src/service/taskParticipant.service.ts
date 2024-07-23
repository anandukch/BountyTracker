import { CreateTaskDto } from "../dto/task.dto";
import Employee from "../entity/employee.entity";
import Task from "../entity/task.entity";
import TaskParticipants from "../entity/taskParticipants.entity";
import TaskParticipantRepository from "../repository/taskParticipant.repository";

class TaskParticipantService {
	constructor(private repository: TaskParticipantRepository) {}

	getAllTasks = async (): Promise<TaskParticipants[]> => {
		return this.repository.find();
	};

	// getById = async (id: number) => {
	// 	return this.repository.findOneBy({ id });
	// };

	getTask = async (filter: Partial<TaskParticipants>) => {
		return this.repository.findOneBy(filter);
	};

	create = async (task: Task, employee: Employee) => {
		console.log(task, employee);

		let newTaskParticipant = new TaskParticipants();
		newTaskParticipant.task = task;
		newTaskParticipant.employee = employee;
		newTaskParticipant.employeeId = employee.id;
		newTaskParticipant.taskId = task.id;
		newTaskParticipant.contribution = 0;

		await this.repository.save(newTaskParticipant);
	};

	updateTaskParticipants = async (data: TaskParticipants) => {
		return this.repository.save(data);
	};

	checkAlreadyJoined = async (taskId: number, employeeId: number): Promise<TaskParticipants> => {
		return this.repository.findOneBy({ taskId, employeeId });
	};
}

export default TaskParticipantService;
