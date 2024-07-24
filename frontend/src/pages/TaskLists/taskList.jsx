import DetailBlock from "../../components/DetailBlock";
import TaskDataRow from "../../components/TaskRowData";
import "./style.scss";
import profilImg from "../../assets/profile.png";
import TaskDataHeader from "../../components/TaskDataHeader";
import {
	// useGetEmployeeCreatedTasksQuery,
	// useGetEmployeeCurrentTasksQuery,
	// useGetProfileQuery,
	useLazyGetEmployeeCreatedTasksQuery,
	useLazyGetEmployeeCurrentTasksQuery,
} from "../../api/employeeApi";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { formatDate } from "../../utils/date.utils";
import ListButton from "../../components/Button/ListButton";
import { useDispatch } from "react-redux";
import { addLoggedState } from "../../store/employeeReducer";
import GridColumn from "../../components/GridColumn";
import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";
import { useGetTaskListQuery } from "../../api/taskApi";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
	const [list, setList] = useState([]);
	const [employeeTasks, { isSuccess: isCurrentTaskFetched, isFetching: loading1 }] =
		useLazyGetEmployeeCurrentTasksQuery();
	const [employeeCreatedTask, { isSuccess: isCreatedTaskFetched, isFetching: loading2, isFetching }] =
		useLazyGetEmployeeCreatedTasksQuery();
	const { data: employeeAllTaskData = [], isSuccess: isAllTaskFetched, isLoading: loading3 } = useGetTaskListQuery();

	const [addClass, setAddClass] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		if (isAllTaskFetched) {
			setList(employeeAllTaskData.data);
			console.log("hi");
			console.log(employeeAllTaskData.data);
		}
	}, [isAllTaskFetched]);

	useEffect(() => {
		console.log(addClass);
	}, [addClass]);

	const handleAll = () => {
		setAddClass(0);
	};

	const handlePending = async () => {
		const data = await employeeTasks();

		setList(data.data.data);
		setAddClass(1);
	};

	const handleCompleted = async () => {
		const data = await employeeTasks();
		setList(data.data.data);
		setAddClass(2);
	};

	const handleCreatedTasks = async () => {
		const data = await employeeCreatedTask();

		setList(data.data.data);
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
			{(loading1 || loading2 || loading3) && <Loader />}
			<section className="employeeDashboard">
				<div className="searchSort">
					<h1>Task List</h1>

					<div className="createTask">
						<Button
							text="CreateTask"
							isPrimary={true}
							onClick={() => {
								navigate("/tasks/create");
							}}
						/>
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
								buttonClass={`dashboardTaskPending${addClass === 1 ? " activeTab" : ""}`}
								clickHandle={handlePending}
							/>
							<ListButton
								text={"Completed Task"}
								buttonClass={`dashboardTaskCompleted${addClass === 2 ? " activeTab" : ""}`}
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
							{isAllTaskFetched &&
								list.map((task) => {
									let formattedTask = task;
									if (addClass == 0 || addClass == 3) {
										formattedTask = {
											task: task,
										};
									}

									// if (addClass === 2 && task.task.status !== "Completed")
									return <TaskDataRow key={task.id} taskRows={formattedTask} />;
									// else if (addClass === 1 && task.task.status == "Completed") {
									// 	return <TaskDataRow key={task.id} taskRows={task} />;
								})}
							{!isAllTaskFetched &&
								tasksHeader.map((header) => {
									return <GridColumn key={header.name} name={header.name} />;
								})}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default EmployeeDashboard;

// (isCurrentTaskFetched || isCreatedTaskFetched || isAllTaskFetched)/
