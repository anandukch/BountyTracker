import { CreateEmployeeDto } from "../dto/employee.dto";
import Employee from "../entity/employee.entity";
import Task from "../entity/task.entity";
import EmployeeRepository from "../repository/employee.repository";
import TaskService from "./task.service";

class EmployeeService {
    constructor(
        private employeeRespository: EmployeeRepository,
        taskService: TaskService
    ) {}

    // getMe = async (name: string, email: string): Promise<Employee> => {
    //     return this.employeeRespository.findOneBy({
    //         name,
    //         email,
    //     });
    // };

    getAllEmployees = async (): Promise<Employee[]> => {
        // TODO
        return;
    };

    getEmployeeByID = async (employeeID: number): Promise<Employee> => {
        // TODO
        return;
    };

    getEmployeeTasksByID = async (employeeID: number): Promise<Task[]> => {
        // TODO
        return;
    };

    loginEmployee = async (
        email: string,
        password: string
    ): Promise<string> => {
        // TODO
        return;
    };

    createEmployee = async (
        employeeDto: CreateEmployeeDto
    ): Promise<Employee> => {
        // TODO
        return;
    };
}

export default EmployeeService;
