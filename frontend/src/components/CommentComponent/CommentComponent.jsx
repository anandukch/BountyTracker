import "./styles.scss";
const CommentComponent = ({ name, comment, currEmployee, type, onClick,loggedState,status }) => {
	console.log(type);
	const flag = (currEmployee == name)&&(type==="blah") ? true : false;
	const styleComment = {
		justifyContent: "right",
		width: "50%",
		borderRadius: "15px 0 15px 15px",
	};

	return (
		<div className="commentRecord" style={flag? {justifyContent:"right"}:null}>
			{!flag ? <div className="name">{name}</div> : null}
			<div className="comment" style={flag ? styleComment : null}>
				{comment}
				{!flag && loggedState ==="Regular"? (
					<div className="replyButton" onClick={onClick}>
						Reply
					</div>
				) : <div className="replyButton" onClick={onClick}>
				{status}
			</div>}
			</div>
		</div>
	);
};
export default CommentComponent;
