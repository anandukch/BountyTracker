/* eslint-disable react/prop-types */
import "./ContributionCommentComponent.scss";
import attach from "../../assets/attachwhite.svg";

const ContributionCommentComponent = ({ comment }) => {
	return (
		<div className="ContributionCommentWrapper">
			<div className="ContributionCommentComponent">
				<div className="contributionCommentHead">{comment.employee.name}</div>
				<div className="contributionCommentBody">
					<div className="contributionCommentContent">{comment?.content}</div>
					{comment.fileUrl && <img src={attach} className="attachmentButton"></img>}
				</div>
			</div>
			<span className="replyLink" onClick={() => {}}>
				Reply
			</span>
		</div>
	);
};

export default ContributionCommentComponent;
