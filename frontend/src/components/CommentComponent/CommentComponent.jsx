import "./styles.scss";
const CommentComponent = ({ name, comment, type, onClick, loggedState, status, reply }) => {
	// console.log(name);
	const flagUser = loggedState.username == name ? true : false;
	const flagType = type === "Normal" ? true : false;

	const styleCommentUser = {
		justifyContent: "right",
		width: "fit-content",
		borderRadius: "15px 0 15px 15px",
	};
	const styleCommentNotUser = {
		justifyContent: "left",
		width: "max-content",
		borderRadius: "0 15px 15px 15px",
	};
	const styleName = {};
	return (
		<div className="commentRecord" style={flagType ? (flagUser ? { justifyContent: "right" } : null) : null}>
			{!flagUser ? <div className="name">{name}</div> : null}
			<div className="comment" style={flagType ? (flagUser ? styleCommentUser : styleCommentNotUser) : null}>
				{comment}
				{!flagType ? (
					<div className="reviewStatus" onClick={onClick}>
						{status}
					</div>
				) : null}
			</div>
			{flagType ? (
				<div className="replyButton" onClick={onClick}>
					reply
				</div>
			) : null}
		</div>
	);
};
export default CommentComponent;
