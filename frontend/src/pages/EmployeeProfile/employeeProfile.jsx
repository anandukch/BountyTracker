import DetailBlock from "../../components/DetailBlock";
import "./style.scss";
import Button from "../../components/Button/Button";
import profilImg from "../../assets/profile.png";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { formatDate } from "../../utils/date.utils";
import { VictoryPie } from "victory";
import platinumBadge from "../../assets/platinumMedal.svg";
import koynLogo from "../../assets/KoYns-Logo.png";
import rewardsLogo from "../../assets/rewards.svg";
import {
	useGetEmployeeCurrentTasksQuery,
	useGetProfileQuery,
	useGetRedeemRequestsQuery,
	useRedeemRewardMutation,
} from "../../api/employeeApi";
 
 
import { useNavigate } from "react-router-dom";
const EmployeeProfile = () => {
	const [employee, setEmployee] = useState({});
	const [employeeDetails, setEmployeeDetails] = useState([]);
	const [redeemDisable, setRedeemDisable] = useState(false);
	const [redeemReward, { isSuccess: redeemSuccess }] = useRedeemRewardMutation();
	const { data, isLoading, isSuccess } = useGetProfileQuery();
	const { data: redeemRequests, isSuccess: redeemSuccessGet } = useGetUserRedeemQuery();

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
		}
	}, [data, isSuccess]);

	useEffect(() => {
		if (redeemSuccessGet) {
			if (redeemRequests?.data.length != 0 || employee.details?.rewards == 0) {
				setRedeemDisable(true);
			}
		}
	}, [employee, redeemRequests, redeemSuccessGet]);
	const navigate = useNavigate();

	const handleRedeem = () => {
		const reward = employee.details.rewards;
		redeemReward({ reward });
	};

	return (
		<div className="employeeProfileWrapper">
			{isLoading && <Loader />}
			<section className="employeeDashboard">
				<div className="employeeDetailsWrapper">
					<div className="employeeProfileWrapper">
						<div className="employeeProfilePage">
							<img src={profilImg} alt="Profile" />
							<h3 className="employeeNameText">{employee.name}</h3>

							<div className="heads">
								Details
								<span className="line"></span>
								<span className="text"> </span>
							</div>
							<div className="employeeDetailsGrid">
								{employeeDetails.map((detail) => (
									<DetailBlock key={detail.header} header={detail.header} content={detail.content} />
								))}
							</div>
						</div>
					</div>
					<div className="taskCountWrapper">
						<div className="taskCounter">
							<div
								className="totalTaskWrapper"
								onClick={() => {
									navigate("/tasks");
								}}
							>
								<h3>Total Tasks</h3>
								<p>{employee.completedTasks + employee.pendingTasks || 0}</p>
							</div>
							<div
								className="pendingTaskWrapper"
								onClick={() => {
									navigate("/tasks");
								}}
							>
								<h3>Pending Tasks</h3>
								<p>{employee.pendingTasks || 0}</p>
							</div>
							<div
								className="completedTaskWrapper"
								onClick={() => {
									navigate("/tasks");
								}}
							>
								<h3>Completed Tasks</h3>
								<p>{employee.completedTasks || 0}</p>
							</div>
						</div>
						<div className="taskGraph">
							{employee.pendingTasks != 0 || employee.completedTasks != 0 && (
								<VictoryPie
									colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
									animate={{ duration: 2000 }}
									data={[
										{ x: "Pending", y: employee.pendingTasks || 0, label: "Pending" },
										{ x: "Completed", y: employee.completedTasks || 0, label: "Completed" },
									]}
									innerRadius={90}
									labelPosition={({ index }) => (index ? "centroid" : "parallel")}
									labelRadius={({ innerRadius }) => innerRadius + 110} // Adjust label radius
									padAngle={4}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="employeeTasksWrapper">
					<div
						className="currentTier"
						onClick={() => {
							nav;
						}}
					>
						<p>Platinum Count:</p>
						<span className="platinumCountWrapper">
							<img className="platinumCount" src={platinumBadge} alt="Platinum Badge" />
							<p>x{employee?.details?.platinumCount || 0}</p>
						</span>
					</div>
					<div className="bounty">
						Total KoYns:
						<span className="bountyCountWrapper">
							<img className="bountyCount" src={koynLogo}></img>
							<p>{employee?.details?.totalBounty || 0}</p>
						</span>
					</div>
					<div className="rewards">
						Total Rewards:
						<span className="rewardCountWrapper">
							<img className="rewardCount" src={rewardsLogo}></img>
							<p>{employee?.details?.rewards || 0}</p>
						</span>
					</div>
					{/* {!redeemDisable && ( */}
					<div className="requestButton">
						<Button
							text="Redeem Request"
							isPrimary={true}
							onClick={handleRedeem}
							isDisabled={redeemDisable}
						/>
					</div>
					{/* )} */}
				</div>
			</section>
		</div>
	);
};

export default EmployeeProfile;
