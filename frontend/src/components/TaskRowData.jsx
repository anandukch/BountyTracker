import TaskColumnData from "./TaskColumnData";

const TaskDataRow = ({ taskRows = [] }) => {
  return (
    <div className="taskDataRow">
      <TaskColumnData content={taskRows.title} />
      <TaskColumnData content={taskRows.createdBy.name} />
      <TaskColumnData
        content={new Date(taskRows.deadLine).toLocaleDateString("en-Gb", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
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
