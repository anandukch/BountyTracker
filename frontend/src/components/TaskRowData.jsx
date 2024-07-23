/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatDate } from "../utils/date.utils";
import TaskColumnData from "./TaskColumnData";

const TaskDataRow = ({ taskRows }) => {
	// let status = "In Progress";
	// if (taskRows.task.status == "completed") status = "Completed";
	return (
		<Link className="taskDataRow" to={`/employee/taskDetails/${taskRows.task.id}`}>
			<TaskColumnData content={taskRows.task.title || ""} />
			<TaskColumnData content={taskRows.task.createdBy.name || ""} />
			<TaskColumnData content={formatDate(taskRows.task.deadLine) || ""} />
			<TaskColumnData
				content={
					`
          ${taskRows.task.currentParticipants} / ${taskRows.task.maxParticipants}` || ""
				}
			/>
			<TaskColumnData content={taskRows.task.status || "Joined"} />
			<TaskColumnData content={taskRows.contribution || 0} />
		</Link>
	);
};

export default TaskDataRow;
