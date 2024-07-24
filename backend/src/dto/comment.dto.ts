import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInstance, IsUrl, IsNumber } from "class-validator";
import { CommentType } from "../utils/commentType.enum";
import Comment from "../entity/comment.entity";
import ReviewStatus from "../utils/reviewStatus.enum";

export class CreateComementDto {
	@IsNotEmpty()
	@IsEnum(CommentType)
	commentType: CommentType;

	@IsNotEmpty()
	@IsString()
	content: string;

	@IsOptional()
	@IsString()
	fileUrl: string;

	@IsOptional()
	@IsString()
	mentionCommentId: number;
}

export class ReviewCommentDto {
	@IsNotEmpty()
	@IsEnum(ReviewStatus)
	reviewStatus: ReviewStatus;

	@IsOptional()
	@IsNumber()
	reviewRewardBounty: number;
}
