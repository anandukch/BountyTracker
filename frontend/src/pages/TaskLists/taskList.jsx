import DetailBlock from "../../components/DetailBlock";
import TaskDataRow from "../../components/TaskRowData";
import "./style.scss";
import profilImg from "../../assets/profile.png";
import TaskDataHeader from "../../components/TaskDataHeader";
import { useLazyGetEmployeeCreatedTasksQuery, useLazyGetEmployeeCurrentTasksQuery } from "../../api/employeeApi";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import ListButton from "../../components/Button/ListButton";
import { useDispatch, useSelector } from "react-redux";
import GridColumn from "../../components/GridColumn";
import Button from "../../components/Button/Button";
import { useGetTaskListQuery, useLazyGetTaskListQuery } from "../../api/taskApi";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
	const state = useSelector((state) => state.employee.employee);

	const [list, setList] = useState([]);
	const [employeeTasks, { isFetching: loading1 }] = useLazyGetEmployeeCurrentTasksQuery();
	const [employeeCreatedTask, { isFetching: loading2 }] = useLazyGetEmployeeCreatedTasksQuery();
	const { data: employeeAllTaskData = [], isSuccess: isAllTaskFetched } = useGetTaskListQuery();
	const [employeeAllTask, { isSuccess: isAllTaskFetchedLazy, isFetching: loading4 }] = useLazyGetTaskListQuery();

	const [addClass, setAddClass] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		if (isAllTaskFetched) {
			setList(employeeAllTaskData.data);
		}
	}, [employeeAllTaskData.data, isAllTaskFetched]);

	const handleAll = async () => {
		const data = await employeeAllTask();
		setList(data.data.data);
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

	return (
		<div className="employeeDashboardWrapper">
			{(loading1 || loading2 || loading4) && <Loader />}
			<section className="employeeDashboard">
				<div className="searchSort">
					<h1>Tasks</h1>

					{state.role === "Lead" && (
						<div className="createTask">
							<Button
								text="Create Task"
								isPrimary={true}
								onClick={() => {
									navigate("/tasks/create");
								}}
							/>
						</div>
					)}
				</div>

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

						{state.role == "Lead" && (
							<div className="taskBarWrap0">
								<ListButton
									text={"Created tasks"}
									buttonClass={`dashboardTaskAll${addClass === 3 ? " activeTab" : ""}`}
									clickHandle={handleCreatedTasks}
								/>
							</div>
						)}
						{/* <div className="search">
							<Search />
						</div> */}
					</div>

					<div className="taskLogWrapper">
						<div className="listHeaderTask">
							{tasksHeader.map((header) => {
								return <GridColumn key={header.name} name={header.name} />;
							})}
						</div>
						<div className="taskDetailsWrapper">
							{(isAllTaskFetched || isAllTaskFetchedLazy) &&
								list.map((task) => {
									let formattedTask = task;
									if (addClass == 0 || addClass == 3) {
										formattedTask = {
											task: task,
										};
									}
									if (addClass == 0 || addClass == 3)
										return <TaskDataRow key={task.id} taskRows={formattedTask} />;
									else if (addClass === 1 && task.task.status !== "Completed")
										return <TaskDataRow key={task.id} taskRows={formattedTask} />;
									else if (addClass === 2 && task.task.status == "Completed") {
										return <TaskDataRow key={task.id} taskRows={task} />;
									}
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
