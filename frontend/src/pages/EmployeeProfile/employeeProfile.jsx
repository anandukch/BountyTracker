import DetailBlock from "../../components/DetailBlock";
import TaskDataRow from "../../components/TaskRowData";
import "./style.scss";
import Button from "../../components/Button/Button";
import profilImg from "../../assets/profile.png";
import TaskDataHeader from "../../components/TaskDataHeader";
import {
	useGetEmployeeCurrentTasksQuery,
	useGetProfileQuery,
	useGetRedeemRequestsQuery,
	useRedeemRewardMutation,
} from "../../api/employeeApi";
import platinumBadge from "../../assets/platinumMedal.svg";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { formatDate } from "../../utils/date.utils";
import ListButton from "../../components/Button/ListButton";
import { addLoggedState } from "../../store/employeeReducer";
import { PieChart } from "react-minimal-pie-chart";

const EmployeeProfile = () => {
	const [employee, setEmployee] = useState({});
	const [employeeDetails, setEmployeeDetails] = useState([]);
	const [redeemDisable, setRedeemDisable] = useState(false);
	const [redeemReward, { isSuccess: redeemSuccess }] = useRedeemRewardMutation();
	const { data, isLoading, isSuccess } = useGetProfileQuery();
	const { data: redeemRequests } = useGetRedeemRequestsQuery();

	useEffect(() => {
		if (isSuccess) {
			const { data: employeeData } = data;
			setEmployee(employeeData);
			setEmployeeDetails([
				{ header: "Role", content: employeeData.role },
				{ header: "Email", content: employeeData.email },
				{ header: "Tier", content: employeeData.currentTier || "N/A" },
				{ header: "Birthday", content: formatDate(employeeData.details.birthday) },
				{ header: "Gender", content: employeeData.details.gender },
				{ header: "Phone", content: employeeData.details.phoneNo },
			]);
			const redeemReq = redeemRequests?.data.filter((request) => request.employee.id === employeeData.id);
			if (redeemReq) setRedeemDisable(true);
			// dispatch(addLoggedState({ role: employeeData.role, name: employeeData.name }));
		}
	}, [data, isSuccess]);

	const [addClass, setAddClass] = useState(0);
	const handleRedeem = () => {
		console.log();
		redeemReward(employee.details.rewards);
		console.log("handle redeem");
		if (redeemSuccess) console.log("redeem request sent");
	};
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
	// useEffect(() => {
	// 	console.log(employee);
	// }, [employee]);

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
						<div className="taskGraph">
							{/* <PieChart


								
								animation
								animationDuration={500}
								animationEasing="ease-out"
								// center={[50, 50]}
								data={[
									{
									color: "#E38627",
									title: "One",
									value: 10,
									},
									{
									color: "#C13C37",
									title: "Two",
									value: 15,
									},
									{
									color: "#6A2135",
									title: "Three",
									value: 20,
									},
								]}
								// labelPosition={50}
								// lengthAngle={360}
								// lineWidth={5}
								paddingAngle={0}
								radius={50}
								startAngle={0}
								viewBoxSize={[100, 100]}
									/> */}
							<PieChart
								animate
								animationDuration={1000}
								segmentsShift={1}
								paddingAngle={0}
								animationEasing="ease-out"
								data={[
									{ title: "One", value: employee.pendingTasks, color: "#C13C37" },
									{ title: "Two", value: employee.completedTasks, color: "#6bb456" },
									// { title: "Three", value: 20, color: "#6A2135" },
								]}
							/>
						</div>
					</div>
				</div>
				<div className="employeeTasksWrapper">
					<div className="currentTier">
						<p>Platinum Count:</p>
						<span className="platinumCountWrapper">
							<img className="platinumCount" src={platinumBadge} />
							<p>x{employee?.details?.platinumCount || 0}</p>
						</span>
					</div>
					<div className="bounty">
						Total Bounty:
						<h4>{employee?.details?.totalBounty}</h4>
					</div>
					<div className="rewards">
						Total Rewards:
						<h4>
							{employee?.details?.rewards}
							{/* 20000 */}
						</h4>
					</div>
					{}
					<div className="requestButton">
						<Button text="Redeem Request" isPrimary={true} onClick={handleRedeem} />
					</div>
				</div>
			</section>
		</div>
	);
};

export default EmployeeProfile;
