import { CreateTaskDto } from "../dto/task.dto";
import Task from "../entity/task.entity";
import TaskRepository from "../repository/task.repository";

class TaskService {
    constructor(private taskRepository: TaskRepository) {}

    getAllTasks = async (): Promise<Task[]> => {
        return this.taskRepository.find();
    };

    getTaskById = async (id: number) => {
        return this.taskRepository.findOneBy({ id });
    };

    createTask = async (task: CreateTaskDto) => {
        let newTask = new Task();
        newTask = task as Task;
        await this.taskRepository.save(newTask);
    };
}

export default TaskService;
