import TaskColumnData from "./TaskColumnData";

const TaskDataRow = ({ taskRows = [] }) => {
  return (
    <div className="taskDataRow">
      <TaskColumnData key={taskRows.name} content={taskRows.name} />
      <TaskColumnData key={taskRows.assignedBy} content={taskRows.assignedBy} />
      <TaskColumnData key={taskRows.dueDate} content={taskRows.dueDate} />
      <TaskColumnData
        key={taskRows.participants}
        content={taskRows.participants}
      />
      <TaskColumnData key={taskRows.status} content={taskRows.status} />
      <TaskColumnData key={taskRows.bounty} content={taskRows.bounty} />
    </div>
  );
};

export default TaskDataRow;
