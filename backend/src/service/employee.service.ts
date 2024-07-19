import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
    constructor(private employeeRespository: EmployeeRepository) {}

    getMe = async (name: string, email: string): Promise<Employee> => {
        return this.employeeRespository.findOneBy({
            name,
            email,
        });
    };

    
}

export default EmployeeService;
