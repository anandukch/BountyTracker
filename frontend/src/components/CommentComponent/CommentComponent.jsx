/* eslint-disable react/prop-types */
import "./styles.scss";
import download from "../../assets/download.svg";

const CommentComponent = ({ comment, handleReplyClick, currentEmployeeEmail }) => {
	const isOwnComment = comment?.employee?.email === currentEmployeeEmail;
	return (
		comment && (
			<>
				<div className={`commentWrapper ${isOwnComment ? "ownComment" : ""}`}>
					<div className="commentBodyWithAttachment">
						<div className="commentBody">
							{!isOwnComment && <span className="commentUsername">{comment.employee.name}</span>}
							{comment.mentionComment && (
								<span className="mentionComment">
									<span className="mentionedEmployee">{comment.mentionComment.employee.name}</span>
									<span className="mentionedCommentContent">{comment.mentionComment.content}</span>
								</span>
							)}
							<span className="commentContent">{comment.content}</span>
						</div>
						{comment.fileUrl && (
							<button className="downloadButton" onClick={() => comment.fileUrl}>
								<img src={download}></img>
							</button>
						)}
						{/* TODO: button link */}
					</div>
					<span className="replyLink" onClick={() => handleReplyClick(comment.id)}>
						Reply
					</span>
				</div>
			</>
		)
	);
};

export default CommentComponent;
