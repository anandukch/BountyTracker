/* eslint-disable react/prop-types */
import uparrow from "../assets/up-arrow.png";
const GridDataColumnList = ({ taskid, taskname, assignedby, startdate, duedate, koyns, participants }) => {
	return (
		<div className="listDataSet">
			{/* <div className="employeeId">
                {id}
            </div> */}
			<div className="taskId">{taskid}</div>
			<div className="taskName">{taskname}</div>
			<div className="taskAssignedby">{assignedby}</div>

			<div className="taskDuedate">{duedate}</div>
			<div className="taskStartdate">{startdate}</div>

			<div className="taskParticipants">{participants}</div>

			<div className="taskBounty">
				{koyns} Kyns 
			</div>
		</div>
	);
};
export default GridDataColumnList;
