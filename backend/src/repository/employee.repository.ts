import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import BaseRepository from "./base.repository";

class EmployeeRepository extends BaseRepository<Employee> {
	constructor(repository: Repository<Employee>) {
		super(repository);
	}
}

export default EmployeeRepository;
