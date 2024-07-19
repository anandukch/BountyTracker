import { Repository } from "typeorm";
import Task from "../entity/task.entity";

class TaskRepository {
    constructor(private repository: Repository<Task>) {}
}

export default TaskRepository;
