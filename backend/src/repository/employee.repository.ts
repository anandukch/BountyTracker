import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>) {}

    find = async (): Promise<Employee[]> => {
        return this.repository.find({});
    };

    findOneBy = async (filter: Partial<Employee>): Promise<Employee> => {
        return this.repository.findOne({ where: filter });
    };

    create = async (data: Employee): Promise<Employee> => {
        return this.repository.create(data);
    };
    update = async (id: number, employee: Partial<Employee>) => {
        return this.repository.update({ id }, employee);
    };

    save = async (employee: Employee): Promise<Employee> => {
        return this.repository.save(employee);
    };

    delete = async (filter: Partial<Employee>): Promise<void> => {
        await this.repository.delete(filter.id);
    };

    softDelete = async (employee: Employee): Promise<void> => {
        await this.repository.softRemove(employee);
    };
}

export default EmployeeRepository;
