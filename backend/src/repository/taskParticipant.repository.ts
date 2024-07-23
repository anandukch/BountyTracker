// import { Repository } from "typeorm";
// import TaskParticipants from "../entity/taskParticipants.entity";

import { Repository } from "typeorm";
import TaskParticipants from "../entity/taskParticipants.entity";
import BaseRepository from "./base.repository";

// class TaskParticipantRepository {
// 	constructor(private repository: Repository<TaskParticipants>) {}

// 	find = async (filter?: Partial<TaskParticipants>, relations?: Array<string>): Promise<TaskParticipants[]> => {
// 		return this.repository.find({
// 			where: filter,
// 			relations: relations,
// 		});
// 	};

// 	findOneBy = async (filter?: Partial<TaskParticipants>, relations?: Array<string>): Promise<TaskParticipants> => {
// 		return this.repository.findOne({ where: filter, relations: relations });
// 	};

// 	create = async (data: TaskParticipants): Promise<TaskParticipants> => {
// 		return this.repository.create(data);
// 	};
// 	update = async (id: number, task: Partial<TaskParticipants>) => {
// 		return this.repository.update({ id }, task);
// 	};

// 	save = async (task: TaskParticipants): Promise<TaskParticipants> => {
// 		return this.repository.save(task);
// 	};

// 	delete = async (filter: Partial<TaskParticipants>): Promise<void> => {
// 		await this.repository.delete(filter.id);
// 	};

// 	softDelete = async (task: TaskParticipants): Promise<void> => {
// 		await this.repository.softRemove(task);
// 	};
// }

// export default TaskParticipantRepository;

class TaskParticipantRepository extends BaseRepository<TaskParticipants> {
	constructor(repository: Repository<TaskParticipants>) {
		super(repository);
	}
}

export default TaskParticipantRepository;
