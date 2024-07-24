import TaskColumnData from "./TaskColumnData";
import"../pages/Dashboard/style.scss";


const TaskDataHeader = ({ taskRows = [] }) => {
  return (
    <div className="taskDataRow">
      <TaskColumnData content={taskRows.name} />
      <TaskColumnData content={taskRows.assignedBy} />
      <TaskColumnData content={taskRows.dueDate} />
      <TaskColumnData content={taskRows.participants} />
      <TaskColumnData content={taskRows.status} />
      <TaskColumnData content={taskRows.bounty} />
    </div>
  );
};

export default TaskDataHeader;
