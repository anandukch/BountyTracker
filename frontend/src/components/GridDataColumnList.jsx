/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const GridDataColumnList = ({
	taskid,
	taskname,
	assignedby,
	startdate,
	duedate,
	koyns,
	participants,
	index,
	count,
}) => {
	const navigate = useNavigate();
	const handledisplay = () => {
		navigate(`/tasks/${taskid}`);
	};

	return (
		<div className="listDataSet">
			<div className="taskId" onClick={handledisplay}>
				{taskid}
			</div>
			<div className="taskName" onClick={handledisplay}>
				{taskname}
			</div>
			<div className="taskAssignedby" onClick={handledisplay}>
				{assignedby}
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

			<div className="taskBounty" onClick={handledisplay}>
				{koyns} Kyns
			</div>
		</div>
	);
};
export default GridDataColumnList;
