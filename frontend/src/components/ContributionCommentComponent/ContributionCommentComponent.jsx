/* eslint-disable react/prop-types */
import "./ContributionCommentComponent.scss";
import download from "../../assets/download.svg";

const ContributionCommentComponent = ({ comment }) => {
	console.log(comment);
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
						<button className="attachmentButton">
							<img src={download}></img>
						</button>
					)}
				</div>
			</div>
			<span className="replyLink" onClick={() => onDownloadClick(comment.id)}>
				Reply
			</span>
		</div>
	);
};

export default ContributionCommentComponent;
