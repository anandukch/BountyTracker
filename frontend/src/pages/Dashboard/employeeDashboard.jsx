import DetailBlock from "../../components/DetailBlock";
import TaskDataRow from "../../components/TaskRowData";
import "./style.scss";
import profilImg from "../../assets/profile.png";
import file from "../../utils/employeeTask";
import TaskDataHeader from "../../components/TaskDataHeader";
import { useGetProfileQuery } from "../../api/employeeApi";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { formatDate } from "../../utils/date.utils";
import ListButton from "../../components/Button/ListButton";

const EmployeeDashboard = () => {
	const [employee, setEmployee] = useState({});
	const [employeeDetails, setEmployeeDetails] = useState([]);
	const { data, isLoading, isSuccess } = useGetProfileQuery();

	useEffect(() => {
		if (isSuccess) {
			console.log(data);
			const { data: employeeData } = data;
			setEmployee(employeeData);
			console.log(employeeData);
			setEmployeeDetails([
				{ header: "Role", content: employeeData.role },
				{ header: "Email", content: employeeData.email },
				{ header: "Tier", content: employeeData.tier || "N/A" },
				{ header: "Birthday", content: formatDate(employeeData.details.birthday) },
				{ header: "Gender", content: employeeData.details.gender },
				{ header: "Phone", content: employeeData.details.phoneNo },
			]);
		}
	}, [data, isSuccess]);

	const taskList = file.data;

	const [addClass, setAddClass] = useState(0);

	const handlePending = (e) => {
		setAddClass(0);
		console.log(e.target);
	};

	const handleCompleted = (e) => {
		setAddClass(1);
		console.log(e.target);
	};

	const tasksHeader = {
		name: "Name",
		assignedBy: "Assigned By",
		dueDate: "Due Date",
		participants: "Paricipants",
		status: "Status",
		bounty: "Bounty",
	};

	return (
		<div className="employeeDashboardWrapper">
			{isLoading && <Loader />}
			<section className="employeeDashboard">
				<div className="employeeDetailsWrapper">
					<div className="employeeProfileWrapper">
						<div className="employeeProfilePage">
							<img src={profilImg} />
							<h3 className="employeeNameText">{employee.name}</h3>
							<div className="taskCountWrapper">
								<div className="totalTasksProfile">
									<h4>{employee.completedTasks + employee.pendingTasks || 0}</h4>
									<p>Total</p>
								</div>
								<div className="pendingTasksProfile">
									<h4>{employee.pendingTasks || 0}</h4>
									<p>Pending</p>
								</div>
							</div>
							<p className="totalBounty">
								KoYns : <span className="bountyValue">850</span> KYN
							</p>
						</div>
					</div>
					<div className="employeeDetailsGrid">
						{employeeDetails.map((detail) => {
							return <DetailBlock key={detail.header} header={detail.header} content={detail.content} />;
						})}
					</div>
				</div>
				<div className="employeeTasksWrapper">
					<div className="taskBarWrapper">
						<ListButton
							text={"Pending Task"}
							buttonClass={`dashboardTaskPending${addClass === 0 ? " activeTab" : ""}`}
							clickHandle={handlePending}
						/>
						<ListButton
							text={"Completed Task"}
							buttonClass={`dashboardTaskCompleted${addClass === 1 ? " activeTab" : ""}`}
							clickHandle={handleCompleted}
						/>
					</div>
					<div className="taskLogWrapper">
						<div className="taskHeaderWrapper">
							<TaskDataHeader taskRows={tasksHeader} />
						</div>
						<div className="taskDetailsWrapper">
							{taskList.map((task) => {
								return <TaskDataRow key={task.id} taskRows={task} />;
							})}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default EmployeeDashboard;
