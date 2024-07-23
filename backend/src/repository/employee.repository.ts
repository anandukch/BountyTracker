import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import BaseRepository from "./base.repository";

// class EmployeeRepository {
// 	constructor(private repository: Repository<Employee>) {}

// 	find = async (filter?: Partial<Employee>, relations?: Array<string>): Promise<Employee[]> => {
// 		return this.repository.find({ where: filter, relations });
// 	};

// 	findOneBy = async (filter: Partial<Employee>, relations?: Array<string>): Promise<Employee> => {
// 		return this.repository.findOne({ where: filter, relations: relations });
// 	};

// 	create = async (data: Employee): Promise<Employee> => {
// 		return this.repository.create(data);
// 	};
// 	update = async (id: number, employee: Partial<Employee>) => {
// 		return this.repository.update({ id }, employee);
// 	};

// 	save = async (employee: Employee): Promise<Employee> => {
// 		return this.repository.save(employee);
// 	};

// 	delete = async (filter: Partial<Employee>): Promise<void> => {
// 		await this.repository.delete(filter.id);
// 	};

// 	softDelete = async (employee: Employee): Promise<void> => {
// 		await this.repository.softRemove(employee);
// 	};
// }

// export default EmployeeRepository;

class EmployeeRepository extends BaseRepository<Employee> {
	constructor(repository: Repository<Employee>) {
		super(repository);
	}
}

export default EmployeeRepository;
