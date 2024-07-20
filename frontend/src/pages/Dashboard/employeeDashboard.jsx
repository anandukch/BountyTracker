import DetailBlock from "../../components/DetailBlock";
import TaskDataRow from "../../components/TaskRowData";
import "./style.scss";

const EmployeeDashboard = () => {
  return (
    <div className="employeeDashboardWrapper">
      <section className="employeeDashboard">
        <div className="employeeDetailsWrapper">
          <div className="employeeProfileWrapper">
            <div className="employeeProfilePage">
              <img />
              <h3>Name</h3>
              <p>name@gmail.com</p>
              <div className="taskCountWrapper">
                <div className="totalTasksProfile">
                  <p>Total</p>
                  <h4>15</h4>
                </div>
                <div className="pendingTasksProfile">
                  <p>Pending</p>
                  <h4>4</h4>
                </div>
              </div>
              <p className="totalBounty">
                Bounty: <span className="bountyValue">230</span> Kyns
              </p>
            </div>
          </div>
          <div className="employeeDetailsGrid">
            <DetailBlock />
            <DetailBlock />
            <DetailBlock />
            <DetailBlock />
            <DetailBlock />
            <DetailBlock />
          </div>
        </div>
        <div className="employeeTasksWrapper">
          <div className="taskBarWrapper">
            <button
              type="button"
              className="dashboardTaskPending"
              onClick={() => {
                console.log("Pending Tasks");
              }}
            >
              Pending Tasks
            </button>
            <button
              type="button"
              className="dashboardTaskCompleted"
              onClick={() => {
                console.log("Completed Tasks");
              }}
            >
              Completed Tasks
            </button>
          </div>
          <div className="taskLogWrapper">
            <div className="taskHeaderWrapper">
              <TaskDataRow />
            </div>
            <div className="taskDetailsWrapper">
              <TaskDataRow />
              <TaskDataRow />
              <TaskDataRow />
              <TaskDataRow />
              <TaskDataRow />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeDashboard;
