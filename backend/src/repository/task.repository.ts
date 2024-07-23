import { Repository } from "typeorm";
import Task from "../entity/task.entity";
import BaseRepository from "./base.repository";

class TaskRepository extends BaseRepository<Task> {
	constructor(repository: Repository<Task>) {
		super(repository);
	}
}

export default TaskRepository;
