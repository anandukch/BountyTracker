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

const EmployeeProfile = () => {
	const [employee, setEmployee] = useState({});
	const [employeeDetails, setEmployeeDetails] = useState([]);
	const { data, isLoading, isSuccess } = useGetProfileQuery();
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
	}, [data, dispatch, isSuccess]);

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
		<div className="employeeProfileWrapper">
			{isLoading && <Loader />}
			<section className="employeeDashboard">
				<div className="employeeDetailsWrapper">
					<div className="employeeProfileWrapper">
						<div className="employeeProfilePage">
							<img src={profilImg} />
							<h3 className="employeeNameText">{employee.name}</h3>
							<div className="employeeDetailsGrid">
								{employeeDetails.map((detail) => {
									return (
										<DetailBlock
											key={detail.header}
											header={detail.header}
											content={detail.content}
										/>
									);
								})}
							</div>
							{/* <p className="totalBounty">
								KoYns : <span className="bountyValue">{employee?.details?.totalBounty || 0}</span> KYN
							</p> */}
						</div>
					</div>
					<div className="taskCountWrapper">
						<div className="taskCounter">
							<div className="totalTaskWrapper">
								<h3>Total Tasks</h3>
								<p>{employee.completedTasks + employee.pendingTasks}</p>
							</div>
							<div className="pendingTaskWrapper">
								<h3>Pending Tasks</h3>
								<p>{employee.pendingTasks}</p>
							</div>
							<div className="completedTaskWrapper">
								<h3>Completed Tasks</h3>
								<p>{employee.completedTasks}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="employeeTasksWrapper"></div>
			</section>
		</div>
	);
};

export default EmployeeProfile;
