import { formatDate } from "../utils/date.utils";
import TaskColumnData from "./TaskColumnData";

const TaskDataRow = ({ taskRows = [] }) => {
	let status = "In Progress";
	if (taskRows.task.status == "completed") status = "Completed";
	return (
		<div className="taskDataRow">
			<TaskColumnData content={taskRows.task.title || ""} />
			<TaskColumnData content={taskRows.task.createdBy.name || ""} />
			<TaskColumnData content={formatDate(taskRows.task.deadLine) || ""} />
			<TaskColumnData
				content={
					`
          ${taskRows.task.currentParticipants} / ${taskRows.task.maxParticipants}` || ""
				}
			/>
			<TaskColumnData content={status || ""} />
			<TaskColumnData content={taskRows.contribution || 0} />
		</div>
	);
};

export default TaskDataRow;
