import { NextFunction, Request, Response, Router } from "express";
import EmployeeService from "../service/employee.service";
import { RequestWithRole } from "../utils/requestWithRole";
import authorize from "../middleware/authorize.middleware";
class EmployeeController {
    public router: Router;
    constructor(private employeeService: EmployeeService) {
        this.router = Router();

        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeByID);
        this.router.get("/tasks", this.getEmployeeAssignedTasks);
        this.router.post("/login", this.loginEmployee);
        this.router.post("/create", this.createEmployee);
    }

    public getAllEmployees = async (
        req: RequestWithRole,
        res: Response,
        next: NextFunction
    ) => {
        // TODO:
    };

    public getEmployeeByID = async (
        req: RequestWithRole,
        res: Response,
        next: NextFunction
    ) => {
        // TODO:
    };
    public getEmployeeAssignedTasks = async (
        req: RequestWithRole,
        res: Response,
        next: NextFunction
    ) => {
        // TODO:
    };
    public loginEmployee = async (
        req: RequestWithRole,
        res: Response,
        next: NextFunction
    ) => {
        // TODO:
    };
    public createEmployee = async (
        req: RequestWithRole,
        res: Response,
        next: NextFunction
    ) => {
        // TODO:
    };
}

export default EmployeeController;
