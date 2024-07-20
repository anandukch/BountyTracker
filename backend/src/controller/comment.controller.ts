import { NextFunction, Response, Router } from "express";
import TaskService from "../service/task.service";
import { RequestWithRole } from "../utils/requestWithRole";
import authorize from "../middleware/authorize.middleware";

class CommentController {
	public router: Router;
	constructor(private commentService: CommentService) {
		this.router = Router();
		this.router.get("/", this.getAllComments);
		this.router.get("/:id", this.getCommentById);
		this.router.post("/",this.createComment);
        this.router.patch("/:id",authorize,this.updateComment);
	}

    public getAllComments = async (req: RequestWithRole, res: Response, next: NextFunction) => {
        try{
            const comments = await this.commentService.getAllComments();

            res.status(200).json({
                success: true,
                message: "Comments fetched succesfully",
                data: comments,
            })
        } catch (error) {
            next(error);
        }
    };

    public getCommentById = async (req: RequestWithRole, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;

            const comments = await this.commentService.getCommentById(parseInt(id));

            res.status(200).json({
                success:true,
                message: "Comment fetched succesfully",
                data: comments,
            })
        } catch (error) {
            next(error)
        }
    };

    public createComment = async (req: RequestWithRole, res: Response, next: NextFunction) => {
        try{
            const comment = req.body;
            
            const comments = this.commentService.createComment(comment);

            res.status(200).json({
                success:true,
            message:"Comment created succesfully"        
            })
        } catch(error) {
            next(error)
        }
    };

    public updateComment = async (req: RequestWithRole, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;

            const comment = req.body;

            const comments = await this.commentService.updateComment(parseInt(id),comment)

            res.status(200).json({
                success:true,
                message:"Comment reviewed succesfully",
                data: comment,
            })
        } catch(error) {
            next(error)
        }
    }

}

export default CommentController;
