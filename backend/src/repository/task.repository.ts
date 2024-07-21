import { Repository } from "typeorm";
import Task from "../entity/task.entity";

class TaskRepository {
	constructor(private repository: Repository<Task>) {}

	find = async (filter?: Partial<Task>, relation?: Array<string>): Promise<Task[]> => {
		return this.repository.find({
			where: filter,
			relations: relation,
		});
	};

	findWithRelations = async (relations: Array<string>): Promise<Task[]> => {
		return this.repository.find({
			// relations: ["createdBy", "participants", "participants.employee"],
			relations: relations,
		});
	};

	findOneBy = async (filter: Partial<Task>): Promise<Task> => {
		return this.repository.findOne({
			where: filter,
			relations: {
				comments: true,
			},
		});
	};

	create = async (data: Task): Promise<Task> => {
		return this.repository.create(data);
	};
	update = async (id: number, task: Partial<Task>) => {
		return this.repository.update({ id }, task);
	};

	save = async (task: Task): Promise<Task> => {
		return this.repository.save(task);
	};

	delete = async (filter: Partial<Task>): Promise<void> => {
		await this.repository.delete(filter.id);
	};

	softDelete = async (task: Task): Promise<void> => {
		await this.repository.softRemove(task);
	};
}

export default TaskRepository;
