import TaskRepository from "../repository/task.repository";

class TaskService {
    constructor(private taskRepository: TaskRepository) {}
}

export default TaskService;
