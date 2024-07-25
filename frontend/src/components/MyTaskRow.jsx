import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/date.utils";

const FetchListRow = ({ id, taskid, taskname, assignedby, startdate, duedate, koyns, participants }) => {
	const navigate = useNavigate();
	const handledisplay = () => {
		navigate(`/tasks/${taskid}`);
	};
	return (
		<div className="listDataSetTask">
			{/* <div className="taskId" onClick={handledisplay}>
				{taskid}
			</div> */}
			<div className="taskName" onClick={handledisplay}>
				{taskname}
			</div>
			<div className="taskAssignedby" onClick={handledisplay}>
				{assignedby}
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

			<div className="taskBounty" onClick={handledisplay}>
				{koyns} Kyns
			</div>
		</div>
	);
};
export default FetchListRow;
