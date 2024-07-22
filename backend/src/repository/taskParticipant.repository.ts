import { Repository } from "typeorm";
import TaskParticipants from "../entity/taskParticipants.entity";

class TaskParticipantRepository {
	constructor(private repository: Repository<TaskParticipants>) {}

	find = async (): Promise<TaskParticipants[]> => {
		return this.repository.find({
			relations: ["createdBy"],
		});
	};

	findOneBy = async (filter: Partial<TaskParticipants>): Promise<TaskParticipants> => {
		return this.repository.findOne({ where: filter });
	};

	create = async (data: TaskParticipants): Promise<TaskParticipants> => {
		return this.repository.create(data);
	};
	update = async (id: number, task: Partial<TaskParticipants>) => {
		return this.repository.update({ id }, task);
	};

	save = async (task: TaskParticipants): Promise<TaskParticipants> => {
		return this.repository.save(task);
	};

	delete = async (filter: Partial<TaskParticipants>): Promise<void> => {
		await this.repository.delete(filter.id);
	};

	softDelete = async (task: TaskParticipants): Promise<void> => {
		await this.repository.softRemove(task);
	};
}

export default TaskParticipantRepository;
