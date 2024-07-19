import { Router } from "express";
import TaskService from "../service/task.service";

class TaskController {
    public router: Router;
    constructor(private taskService: TaskService) {
        
    }
}

export default TaskController;
