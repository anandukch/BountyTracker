import { Column, Entity } from "typeorm";
import AbstractEntity from "./abstract.entity";

@Entity()
class RedeemRequest extends AbstractEntity {
	@Column()
	title: string;
}

export default RedeemRequest;
