import Button from "./Button/Button";
const GridRequestColumn = ({ name, id, commentId, requestTime, tier, onApprove, onReject }) => {
	return (
		<div className="listDataSet">
			<div className="employeeId">{id}</div>
			<div className="employeeName">{name}</div>
			<div className="requestTime">{requestTime}</div>
			<div className="tier">{tier}</div>
			<div className="buttons">
				<Button
					text="Approve"
					isPrimary={true}
					onClick={() => onApprove({ id: id, commentId: commentId, status: "Approved" })}
				/>
				<Button
					text="Reject"
					className="cancel"
					onClick={() => onReject({ id: id, commentId: commentId, status: "Rejected" })}
				/>
			</div>
		</div>
	);
};
export default GridRequestColumn;
