/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatDate } from "../utils/date.utils";
import TaskColumnData from "./TaskColumnData";
import { setStatus } from "../utils/status.util";

const TaskDataRow = ({ taskRows }) => {
	return (
		<Link className="taskDataRow" to={`/tasks/${taskRows.task.id}`}>
			<TaskColumnData content={taskRows.task.title || ""} />
			<TaskColumnData content={taskRows.task.createdBy.name || ""} />
			<TaskColumnData content={formatDate(taskRows.task.deadLine) || ""} />
			<TaskColumnData content={`${taskRows.task.currentParticipants} / ${taskRows.task.maxParticipants}` || ""} />
			<TaskColumnData
				content={setStatus(taskRows.task.startDate, taskRows.task.deadLine, taskRows.task.status)}
			/>
			<TaskColumnData content={taskRows.contribution || 0} />
		</Link>
	);
};

export default TaskDataRow;
