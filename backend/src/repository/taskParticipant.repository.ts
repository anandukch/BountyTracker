import { Repository } from "typeorm";
import TaskParticipants from "../entity/taskParticipants.entity";
import BaseRepository from "./base.repository";

class TaskParticipantRepository extends BaseRepository<TaskParticipants> {
	constructor(repository: Repository<TaskParticipants>) {
		super(repository);
	}
}

export default TaskParticipantRepository;
