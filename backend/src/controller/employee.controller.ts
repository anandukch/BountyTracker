import { NextFunction, Request, Response, Router } from "express";
import EmployeeService from "../service/employee.service";

class EmployeeController {
    public router: Router;
    constructor(private employeeService: EmployeeService) {
        this.router = Router();
    }
}

export default EmployeeController;
