/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatDate } from "../utils/date.utils";
import TaskColumnData from "./TaskColumnData";
import { setStatus } from "../utils/status.util";
import "../pages/Dashboard/style.scss";

const TaskDataRow = ({ taskRows }) => {
	let color = "#efecda";
  const status=setStatus(taskRows.task.startDate, taskRows.task.deadLine, taskRows.task.status)
   
	if (status == "In review") color = "#f5ecb8";
	if (taskRows.task.status == "In progress") color = "#d3f4be";
	if (status == "Completed") color = "#d3f4be";

	return (
		<Link className="taskDataRow" to={`/tasks/${taskRows.task.id}`}>
			<TaskColumnData content={taskRows.task.title || ""} />
			<TaskColumnData content={taskRows.task.createdBy.name || ""} />
			<TaskColumnData content={formatDate(taskRows.task.deadLine) || ""} />
			<TaskColumnData content={`${taskRows.task.currentParticipants} / ${taskRows.task.maxParticipants}` || ""} />
			<TaskColumnData
				className="status"
				content={status}
				color={color}
			/>
			<TaskColumnData content={taskRows.contribution || 0} />
		</Link>
	);
};

export default TaskDataRow;
