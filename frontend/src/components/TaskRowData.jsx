import TaskColumnData from "./TaskColumnData";

const TaskDataRow = ({ taskRows = [] }) => {
  return (
    <div className="taskDataRow">
      <TaskColumnData content={taskRows.task.title} />
      <TaskColumnData content={taskRows.task.status} />
      <TaskColumnData
        content={new Date(taskRows.task.deadLine).toLocaleDateString("en-Gb", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
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
