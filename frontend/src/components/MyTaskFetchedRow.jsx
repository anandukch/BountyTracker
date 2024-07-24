import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/date.utils";
import { setStatus } from "../utils/status.util";

const FetchMyListRow = ({
	id,
	taskid,
	taskname,
	progress,
	startdate,
	duedate,
	koyns,
	participants,
	taskStatus,
	reviewPendingCount,
}) => {
	const navigate = useNavigate();
	const handledisplay = () => {
		navigate(`/tasks/${taskid}`);
	};
	console.log(reviewPendingCount);
	// const notificationCount = reviewPendingCount == 0 ? null : reviewPendingCount;
	const rowClass = reviewPendingCount > 0 ? "listDataMyTaskNotification" : "listDataMyTask";
	console.log(rowClass);
	return (
		<div className={rowClass}>
			{/* <div className="taskId" onClick={handledisplay}>
				{taskid}
			</div> */}
			<div className="taskName" onClick={handledisplay}>
				{taskname}
			</div>

			<div className="taskDuedate" onClick={handledisplay}>
				{formatDate(duedate)}
			</div>
			<div className="taskStartdate" onClick={handledisplay}>
				{formatDate(startdate)}
			</div>

			<div className="taskParticipants" onClick={handledisplay}>
				{participants}
			</div>

			<div className="taskParticipants" onClick={handledisplay}>
				{setStatus(startdate, duedate, taskStatus)}
			</div>

			<div className="taskPercentage" onClick={handledisplay}>
				{((progress / koyns) * 100).toFixed(2)} %
			</div>

			<div className="taskBounty" onClick={handledisplay}>
				<span>{koyns} Kyns</span>
				<div className="taskNotification" onClick={handledisplay}>
					{reviewPendingCount == 0 ? null : reviewPendingCount}
				</div>
			</div>
		</div>
	);
};
export default FetchMyListRow;
