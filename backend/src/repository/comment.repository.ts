import { Repository } from "typeorm";
import Comment from "../entity/comment.entity";

class CommentRepository {
	constructor(private repository: Repository<Comment>) {}

	find = async (): Promise<Comment[]> => {
		return this.repository.find({});
	};

	findOneBy = async (filter: Partial<Comment>): Promise<Comment> => {
		return this.repository.findOne({ where: filter });
	};

	create = async (data: Comment): Promise<Comment> => {
		return this.repository.create(data);                                        
	};
	update = async (id: number, employee: Partial<Comment>) => {
		return this.repository.update({ id }, employee);
	};

	save = async (employee: Comment): Promise<Comment> => {
		return this.repository.save(employee);
	};

	delete = async (filter: Partial<Comment>): Promise<void> => {
		await this.repository.delete(filter.id);
	};

	softDelete = async (employee: Comment): Promise<void> => {
		await this.repository.softRemove(employee);
	};
}

export default CommentRepository;
