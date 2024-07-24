import { IsDate, IsNotEmpty, isNumber, IsNumber, IsString } from "class-validator";
import Task from "../entity/task.entity";
import Employee from "../entity/employee.entity";

export class CreateTaskDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsNumber()
	totalBounty: number;

	@IsNotEmpty()
	@IsNumber()
	maxParticipants: number;

	@IsNotEmpty()
	@IsString()
	deadLine: Date;

	@IsNotEmpty()
	@IsString()
	skills: string;
}

export class UpdateTaskDto {
	@IsNotEmpty()
	status: string;
}

export class ResponseTaskDto extends Task {
	skillList: string[];
	constructor(task: Task) {
		super();
		Object.assign(this, task);
		this.skillList = task.skills.replace(" ", "").split(",");
		delete this.skills;
	}
}
