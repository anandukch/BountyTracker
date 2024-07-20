import { CreateComementDto, UpdateCommentDto } from "../dto/comment.dto";
import Comment from "../entity/comment.entity";
import CommentRepository from "../repository/comment.repository";

class CommentService {
	constructor(private commentRepository: CommentRepository) {}

	getAllComments = async (): Promise<Comment[]> => {
		return this.commentRepository.find();
	};

	getCommentById = async (id: number) => {
		return this.commentRepository.findOneBy({ id });
	};

	createComment = async (comment: CreateComementDto) => {
        //TODO:'Create comment business logic'
		// let newComment = new Comment();
		// newComment = comment as Comment;
		// await this.commentRepository.save(newComment);
	};

    updateComment = async (id:number,comment:UpdateCommentDto) => {
        //TODO:'Update comment business logic'
    }
}

export default CommentService;
