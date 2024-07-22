import { formatDate } from "../utils/date.utils";
import TaskColumnData from "./TaskColumnData";

const TaskDataRow = ({ taskRows = [] }) => {
  return (
    <div className="taskDataRow">
      <TaskColumnData content={taskRows.task.title} />
      <TaskColumnData content={taskRows.task.createdBy.name} />
      <TaskColumnData
        content={formatDate(taskRows.task.deadLine)}
      />
      <TaskColumnData
        content={`
          ${taskRows.task.currentParticipants} / ${taskRows.task.maxParticipants}`}
      />
      <TaskColumnData content={taskRows.task.status} />
      <TaskColumnData content={taskRows.contribution} />
    </div>
  );
};

export default TaskDataRow;
