/* eslint-disable no-undef */
import { useNavigate } from "react-router-dom";
import Progressbar from "./ProgressBar/ProgressBar";
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
	 
	
	const prog = ((progress / koyns) * 100).toFixed(2);
	const navigate = useNavigate();
	const handledisplay = () => {
		navigate(`/tasks/${taskid}`);
	};
	const rowClass = reviewPendingCount > 0 ? "listDataMyTaskNotification" : "listDataMyTask";
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
				
			
				<Progressbar per ={prog}/>
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
