/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatDate } from "../utils/date.utils";
import TaskColumnData from "./TaskColumnData";
import { setStatus } from "../utils/status.util";
import "../pages/TaskLists/style.scss";

const TaskDataRow = ({ taskRows }) => {
	let color = "#efecda";
	let status = taskRows.task.status;
	const date = new Date();
	const currentDate = date.toISOString();
	if (currentDate > taskRows.task.deadLine) status = "In Review";
	if (status == "In Review") color = "#f5ecb8";
	if (status == "In Progress") color = "#efecda";
	if (status == "Completed") color = "#d3f4be";

	return (
		<Link className="taskDataRow" to={`/tasks/${taskRows.task.id}`}>
			<TaskColumnData content={taskRows.task.title || ""} />
			<TaskColumnData content={taskRows.task?.createdBy?.name || ""} />
			<TaskColumnData content={formatDate(taskRows.task.deadLine) || ""} />
			<TaskColumnData content={`${taskRows.task.currentParticipants} / ${taskRows.task.maxParticipants}` || ""} />
			<TaskColumnData className="status" content={status} color={color} />
			<TaskColumnData content={taskRows.task.totalBounty || 0} />
		</Link>
	);
};

export default TaskDataRow;
