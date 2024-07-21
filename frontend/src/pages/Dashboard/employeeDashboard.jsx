import DetailBlock from "../../components/DetailBlock";
import TaskDataRow from "../../components/TaskRowData";
import "./style.scss";
import profilImg from "../../assets/profile.png";

const EmployeeDashboard = () => {
	const tasksHeader = {
		name: "Name",
		assignedBy: "Assigned By",
		dueDate: "Due Date",
		participants: "Paricipants",
		status: "Status",
		bounty: "Bounty",
	};

	const employee = {
		name: "John Doe",
		tasksPending: "4",
		tasksTotal: "15",
		totalBounty: "1400",
		role: "Fullstack Lead",
		email: "johndoe@gmail.com",
		tier: "Gold",
		birthday: "24/11/2001",
		gender: "Male",
		phone: "1234567890",
	};

	const employeeDetails = [
		{ header: "Role", content: employee.role },
		{ header: "Email", content: employee.email },
		{ header: "Tier", content: employee.tier },
		{ header: "Birthday", content: employee.birthday },
		{ header: "Gender", content: employee.gender },
		{ header: "Phone", content: employee.phone },
	];

	const tasks = [
		{
			name: "Design Employee Dashboard",
			assignedBy: "Nalin",
			dueDate: "24/07/2024",
			participants: "4/5",
			status: "In-Progress",
			bounty: "550",
		},

		{
			name: "Update User Interface",
			assignedBy: "Sarah",
			dueDate: "30/07/2024",
			participants: "3/5",
			status: "Pending",
			bounty: "450",
		},
		{
			name: "Implement Payment Gateway",
			assignedBy: "Michael",
			dueDate: "15/08/2024",
			participants: "2/5",
			status: "Planning",
			bounty: "700",
		},
		{
			name: "Write API Documentation",
			assignedBy: "Emily",
			dueDate: "20/07/2024",
			participants: "5/5",
			status: "Completed",
			bounty: "400",
		},
		{
			name: "Conduct User Testing",
			assignedBy: "Kevin",
			dueDate: "02/08/2024",
			participants: "3/5",
			status: "In-Progress",
			bounty: "600",
		},
	];

	console.log(tasks);

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
									<h4>{employee.tasksTotal}</h4>
									<p>Total</p>
								</div>
								<div className="pendingTasksProfile">
									<h4>{employee.tasksPending}</h4>
									<p>Pending</p>
								</div>
							</div>
							<p className="totalBounty">
								KoYns : <span className="bountyValue">{employee.totalBounty} </span>{" "}
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
							<TaskDataRow taskRows={tasksHeader} />
						</div>
						<div className="taskDetailsWrapper">
							{tasks.map((task) => {
								return <TaskDataRow key={task.name} taskRows={task} />;
							})}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default EmployeeDashboard;
