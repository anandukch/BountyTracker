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
import GridColumn from "../../components/GridColumn";
import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";

const EmployeeDashboard = () => {
	// const [employee, setEmployee] = useState({});
	// const [employeeDetails, setEmployeeDetails] = useState([]);
	// const { data, isLoading, isSuccess } = useGetProfileQuery();
	const { data: employeeTasksData = [], isSuccess: isTaskFetched, isLoading } = useGetEmployeeCurrentTasksQuery();
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	if (isSuccess) {
	// 		const { data: employeeData } = data;
	// 		setEmployee(employeeData);
	// 		setEmployeeDetails([
	// 			{ header: "Role", content: employeeData.role },
	// 			{ header: "Email", content: employeeData.email },
	// 			{ header: "Tier", content: employeeData.tier || "N/A" },
	// 			{ header: "Birthday", content: formatDate(employeeData.details.birthday) },
	// 			{ header: "Gender", content: employeeData.details.gender },
	// 			{ header: "Phone", content: employeeData.details.phoneNo },
	// 		]);
	// 		dispatch(addLoggedState({ role: employeeData.role, name: employeeData.name }));
	// 	}
	// }, [data, isSuccess]);

	const [addClass, setAddClass] = useState(0);

	const handlePending = () => {
		setAddClass(2);
	};

	const handleCompleted = () => {
		setAddClass(1);
	};

	const handleAll = () => {
		setAddClass(0);
	};

	const handleCreatedTasks = () => {
		setAddClass(3);
	};
	const tasksHeader = [
		// { name: "Task Id" },
		{ name: "Task Name" },
		{ name: "Assigned By" },
		{ name: "Deadline" },
		{ name: "Participants" },
		{ name: "Status" },
		{ name: "KoYns" },
	];
	// const [createTask, { data, isSuccess, isError, error }] = useCreateTaskMutation();
	// const createTaskHandler = () => {
	// 	createTask({
	// 		...formData,
	// 		totalBounty: parseInt(formData.totalBounty),
	// 		maxParticipants: parseInt(formData.maxParticipants),
	// 	});
	// };

	// (dont)
	// useEffect(() => {
	// 	console.log(employee);
	// }, [employee]);

	return (
		<div className="employeeDashboardWrapper">
			{isLoading && <Loader />}
			<section className="employeeDashboard">
				<div className="searchSort">
					<h1>Task List</h1>

					<div className="createTask">
						<Button text="CreateTask" isPrimary={true} onClick={"/"} />
					</div>
				</div>
				{/* <div className="employeeDetailsWrapper">
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
				</div> */}
				<div className="employeeTasksWrapper">
					<div className="list">
						<div className="taskBarWrap0">
							<ListButton
								text={"All tasks"}
								buttonClass={`dashboardTaskAll${addClass === 0 ? " activeTab" : ""}`}
								clickHandle={handleAll}
							/>
						</div>
						<div className="taskBarWrapper">
							<ListButton
								text={"Pending Task"}
								buttonClass={`dashboardTaskPending${addClass === 2 ? " activeTab" : ""}`}
								clickHandle={handlePending}
							/>
							<ListButton
								text={"Completed Task"}
								buttonClass={`dashboardTaskCompleted${addClass === 1 ? " activeTab" : ""}`}
								clickHandle={handleCompleted}
							/>
						</div>

						<div className="taskBarWrap0">
							<ListButton
								text={"Created tasks"}
								buttonClass={`dashboardTaskAll${addClass === 3 ? " activeTab" : ""}`}
								clickHandle={handleCreatedTasks}
							/>
						</div>
						{/* <div className="search">
							<Search />
						</div> */}
					</div>

					<div className="taskLogWrapper">
						{/* <div className="taskHeaderWrapper">
							<TaskDataHeader taskRows={tasksHeader} />
						</div> */}
						<div className="listHeaderTask">
							{tasksHeader.map((header) => {
								return <GridColumn key={header.name} name={header.name} />;
							})}
						</div>
						<div className="taskDetailsWrapper">
							{/* {isTaskLoading && <Loader />} */}
							{isTaskFetched &&
								employeeTasksData.data.map((task) => {
									if (addClass === 2 && task.task.status !== "Completed")
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
