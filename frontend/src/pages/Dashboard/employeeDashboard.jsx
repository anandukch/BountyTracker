import DetailBlock from "../../components/DetailBlock";
import TaskDataRow from "../../components/TaskRowData";
import "./style.scss";
import profilImg from "../../assets/profile.png";
import file from "../../utils/employeeTask";
import TaskDataHeader from "../../components/TaskDataHeader";
import { useGetProfileQuery } from "../../api/employeeApi";
import { useEffect } from "react";

const EmployeeDashboard = () => {
	const { data, isLoading } = useGetProfileQuery();

	useEffect(() => {
		console.log(data);
	}, [data]);
	const employee = {
		name: "John Doe",
		email: "johndoe@gmail.com",
		role: "Fullstack Lead",
		tier: "Gold",
		details: {
			totalBounty: "1400",
			birthday: "24/11/2001",
			gender: "Male",
			phoneNo: "1234567890",
		},
	};

	const taskList = file.data;

	const employeeDetails = [
		{ header: "Role", content: employee.role },
		{ header: "Email", content: employee.email },
		{ header: "Tier", content: employee.tier },
		{ header: "Birthday", content: employee.details.birthday },
		{ header: "Gender", content: employee.details.gender },
		{ header: "Phone", content: employee.details.phoneNo },
	];

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
			<section className="employeeDashboard">
				<div className="employeeDetailsWrapper">
					<div className="employeeProfileWrapper">
						<div className="employeeProfilePage">
							<img src={profilImg} />
							<h3 className="employeeNameText">{employee.name}</h3>
							<div className="taskCountWrapper">
								<div className="totalTasksProfile">
									<h4>15</h4>
									<p>Total</p>
								</div>
								<div className="pendingTasksProfile">
									<h4>5</h4>
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
