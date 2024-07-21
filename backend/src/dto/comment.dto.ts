import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInstance, IsUrl, IsNumber } from "class-validator";
import { CommentType } from "../utils/commentType.enum";
import Comment from "../entity/comment.entity";
import ReviewStatus from "../utils/reviewStatus.enum";

export class CreateComementDto {
	@IsNotEmpty()
	@IsString()
	taskId: string;

	@IsNotEmpty()
	@IsEnum(CommentType)
	commentType: CommentType;

	@IsNotEmpty()
	@IsString()
	content: string;

	@IsOptional()
	@IsUrl()
	fileUrl: string;

	@IsOptional()
	@IsString()
	mentionCommentId: string;
}

export class UpdateCommentDto {
	@IsNotEmpty()
	@IsEnum(ReviewStatus)
	reviewStatus: ReviewStatus;

	@IsOptional()
	@IsNumber()
	reviewRewardBounty: number;
}
