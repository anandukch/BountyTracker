import { formatDate } from "../utils/date.utils";
import TaskColumnData from "./TaskColumnData";

const TaskDataRow = ({ taskRows = [] }) => {
  return (
    <div className="taskDataRow">
      <TaskColumnData content={taskRows.title} />
      <TaskColumnData content={taskRows.createdBy.name} />
      <TaskColumnData
        content={formatDate(taskRows.deadLine)}
      />
      <TaskColumnData
        content={`
          ${taskRows.currentParticipants} / ${taskRows.maxParticipants}`}
      />
      <TaskColumnData content={taskRows.status} />
      <TaskColumnData content={taskRows.totalBounty} />
    </div>
  );
};

export default TaskDataRow;
