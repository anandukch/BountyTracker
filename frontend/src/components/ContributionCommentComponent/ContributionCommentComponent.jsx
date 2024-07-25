/* eslint-disable react/prop-types */
import "./ContributionCommentComponent.scss";
import download from "../../assets/download.svg";

const ContributionCommentComponent = ({ comment }) => {
	const onDownloadClick = (id) => {
		window.open(`http://localhost:3000/tasks/comments/${id}/file`);
	};
	return (
		<div className="ContributionCommentWrapper">
			<div className="ContributionCommentComponent">
				<div className="contributionCommentHead">{comment.employee.name}</div>
				<div className="contributionCommentBody">
					<div className="contributionCommentContent">{comment?.content}</div>
					{comment.fileUrl && (
						<button className="attachmentButton" onClick={() => onDownloadClick(comment.id)}>
							<img src={download}></img>
						</button>
					)}
				</div>
			</div>
			<span className="replyLink">Reply</span>
		</div>
	);
};

export default ContributionCommentComponent;
