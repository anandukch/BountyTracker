import { Repository } from "typeorm";
import Comment from "../entity/comment.entity";

class CommentRepository {
	constructor(private repository: Repository<Comment>) {}

	find = async (): Promise<Comment[]> => {
		return this.repository.find({ relations: { employee: true } });
	};

	findBy = async (filter: Partial<Comment>): Promise<Comment[]> => {
		console.log(filter);
		return this.repository.find({
			where: filter,
			relations: { employee: true },
		});
	};

	findOneBy = async (filter: Partial<Comment>): Promise<Comment> => {
		return this.repository.findOne({
			where: filter,
			relations: {
				mentionComment: true,
			},
		});
	};

	create = async (data: Comment): Promise<Comment> => {
		return this.repository.create(data);
	};
	update = async (id: number, comment: Partial<Comment>) => {
		return this.repository.update({ id }, comment);
	};

	save = async (comment: Comment): Promise<Comment> => {
		return this.repository.save(comment);
	};

	delete = async (filter: Partial<Comment>): Promise<void> => {
		await this.repository.delete(filter.id);
	};

	softDelete = async (comment: Comment): Promise<void> => {
		await this.repository.softRemove(comment);
	};
}

export default CommentRepository;
