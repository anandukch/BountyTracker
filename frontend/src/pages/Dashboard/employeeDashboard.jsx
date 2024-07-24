import DetailBlock from "../../components/DetailBlock";
import TaskDataRow from "../../components/TaskRowData";
import "./style.scss";
import profilImg from "../../assets/profile.png";
import TaskDataHeader from "../../components/TaskDataHeader";
import { useGetEmployeeCurrentTasksQuery, useGetProfileQuery } from "../../api/employeeApi";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { formatDate } from "../../utils/date.utils";
import ListButton from "../../components/Button/ListButton";
import { useDispatch } from "react-redux";
import { addLoggedState } from "../../store/employeeReducer";

const EmployeeDashboard = () => {
	const [employee, setEmployee] = useState({});
	const [employeeDetails, setEmployeeDetails] = useState([]);
	const { data, isLoading, isSuccess } = useGetProfileQuery();
	const { data: employeeTasksData = [], isSuccess: isTaskFetched } = useGetEmployeeCurrentTasksQuery();
	const dispatch = useDispatch();
	useEffect(() => {
		if (isSuccess) {
			const { data: employeeData } = data;
			setEmployee(employeeData);
			setEmployeeDetails([
				{ header: "Role", content: employeeData.role },
				{ header: "Email", content: employeeData.email },
				{ header: "Tier", content: employeeData.tier || "N/A" },
				{ header: "Birthday", content: formatDate(employeeData.details.birthday) },
				{ header: "Gender", content: employeeData.details.gender },
				{ header: "Phone", content: employeeData.details.phoneNo },
			]);
			dispatch(addLoggedState({ role: employeeData.role, name: employeeData.name }));
		}
	}, [data, isSuccess]);

	const [addClass, setAddClass] = useState(0);

	const handlePending = () => {
		setAddClass(0);
	};

	const handleCompleted = () => {
		setAddClass(1);
	};

	const handleAssigned = () => {
		setAddClass(2);
	};

	const tasksHeader = {
		name: "Name",
		assignedBy: "Assigned By",
		dueDate: "Due Date",
		participants: "Paricipants",
		status: "Status",
		bounty: "Bounty",
	};
	useEffect(() => {
		console.log(employee);
	}, [employee]);

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
								KoYns : <span className="bountyValue">{employee?.details?.totalBounty || 0}</span> KYN
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
							{/* {isTaskLoading && <Loader />} */}
							{isTaskFetched &&
								employeeTasksData.data.map((task) => {
									if (addClass === 0 && task.task.status !== "Completed")
										return <TaskDataRow key={task.id} taskRows={task} />;
									else if (addClass === 1 && task.task.status == "Completed") {
										return <TaskDataRow key={task.id} taskRows={task} />;
									}
								})}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default EmployeeDashboard;
