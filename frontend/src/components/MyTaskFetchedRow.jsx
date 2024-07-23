import { useNavigate } from "react-router-dom";

const FetchMyListRow = ({ id, taskid, taskname, progress, startdate, duedate, koyns, participants, taskStatus,index,count }) => {
	const navigate = useNavigate();
	const handledisplay = () => {
		navigate(`/tasks/${taskid}`);
	};
	const rowClass = index.includes(taskid) ? "listDataMyTaskNotification" : "listDataMyTask";
	const notificationCount = index.includes(taskid) ? count[taskid-1] : null;
	return (
		<div className={rowClass}>
			{/* <div className="taskId" onClick={handledisplay}>
				{taskid}
			</div> */}
			<div className="taskName" onClick={handledisplay}>
				{taskname}
			</div>

			<div className="taskDuedate" onClick={handledisplay}>
				{duedate}
			</div>
			<div className="taskStartdate" onClick={handledisplay}>
				{startdate}
			</div>

			<div className="taskParticipants" onClick={handledisplay}>
				{participants}
			</div>

			<div className="taskParticipants" onClick={handledisplay}>
				{taskStatus}
			</div>

			<div className="taskAssignedby" onClick={handledisplay}>
				{progress}
			</div>
			
			<div className="taskBounty" onClick={handledisplay}>
				{koyns} Kyns
				<div className="taskNotification" onClick={handledisplay}>{notificationCount}</div>	
			</div>
		</div>
	);
};
export default FetchMyListRow;
