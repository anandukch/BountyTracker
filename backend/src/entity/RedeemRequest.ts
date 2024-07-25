import { Column, Entity, ManyToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class RedeemRequest extends AbstractEntity {
	@ManyToOne(() => Employee, (employee) => employee.comments)
	employee: Employee;

	@Column()
	content: string;

	@Column()
	status: string;

	@Column()
	redeemAmount: number;
}

export default RedeemRequest;
