/* eslint-disable react/prop-types */
import "./ContributionCommentComponent.scss";
import download from "../../assets/download.svg";

const ContributionCommentComponent = ({ comment }) => {
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
			<span className="replyLink" onClick={() => {}}>
				Reply
			</span>
		</div>
	);
};

export default ContributionCommentComponent;
