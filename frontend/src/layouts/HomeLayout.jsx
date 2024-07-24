import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";
import profile from "../assets/profile-img.svg";
import profileHead from "../assets/profile.png";
import tasks from "../assets/tasks.svg";
import employees from "../assets/employees.svg";
import logout from "../assets/logout.svg";
import logo from "../assets/KoYns-Logo.png";
import text from "../assets/KoYns-Text.png";
import requests from "../assets/requests.svg"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLoggedState } from "../store/employeeReducer";
import { useGetProfileQuery } from "../api/employeeApi";
import myTask from "../assets/myTask.svg";
import Toast from "../components/Toast/customToast";

const HomeLayout = () => {
	const [pageIndex, setPageIndex] = useState(0);
	const location = useLocation();
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.clear("token");
		navigate("/login");
	};
	const { data: employeeData, isLoading, isSuccess } = useGetProfileQuery();
	const dispatch = useDispatch();

	const toastMessages = useSelector((state) => state.toasts.toastMessages);
	const token = localStorage.getItem("token");
	const arrayToken = token.split(".");
	const tokenPayload = JSON.parse(atob(arrayToken[1]));
	useEffect(() => {
		if (isSuccess) {
			// console.log(tokenPayload);
			const token = localStorage.getItem("token");
			const arrayToken = token.split(".");
			const tokenPayload = JSON.parse(atob(arrayToken[1]));
			dispatch(
				addLoggedState({
					role: tokenPayload.role,
					username: tokenPayload.name,
					id: employeeData.data.id,
				}),
			);
		}
	}, [employeeData, isSuccess, dispatch]);

	const sideBar = [
		// {
		// 	id: 0,
		// 	title: "Profile",
		// 	icon: profile,
		// 	to: "/profile",
		// },
		{
			id: 0,
			title: "Tasks",
			icon: tasks,
			to: "/tasks",
		},
		{
			id: 1,
			title: "Employees",
			icon: employees,
			to: "/employees",
		},
		// {
		// 	id: 3,
		// 	title: "My Tasks",
		// 	icon: myTask,
		// 	to: "/myTasks",
		// },
		{
			id:2,
			title: "Requests",
			icon: requests,
			to: "/requests"
		}
	];

	return (
		<>
			<div className="toastContainer">
				{toastMessages && toastMessages.length
					? toastMessages.map((toastMessage) => (
							<Toast
								key={toastMessage.id}
								id={toastMessage.id}
								// active={toastMessage.active}
								message={toastMessage.message}
								status={toastMessage.status}
							/>
						))
					: ""}
			</div>
			<div className="page">
				<div className="header">
					<div className="logo">
						<img src={logo} alt="icon" className="logo-image" />
						<img src={text} alt="icon" className="logo-text" />
					</div>
					<h2>
						<span
							className="profileHeaderWrapper"
							onClick={() => {
								navigate("/employees/profile");
							}}
						>
							<img src={profileHead} alt="Profile Icon" />
							{tokenPayload.name}
						</span>
					</h2>
				</div>
				<aside className="HomeLayout">
					<div className="top">
						{/* <Link
						className={`links ${pageIndex == 0 ? "active" : ""}`}
						to="/employee"
						onClick={() => setPageIndex(0)}
					>
						<div className="icon">
							<img src={profile} alt="icon" className="imgicon" />
						</div>
						Profile
					</Link> */}

						{sideBar.map((item, index) => (
							<Link
								key={item.id}
								className={`links ${location.pathname.search(item.to) >= 0 ? "active" : ""}`}
								to={item.to}
								onClick={() => setPageIndex(index)}
							>
								<div className="icon">
									<img src={item.icon} alt="icon" className="imgicon" />
								</div>
								{item.title}
							</Link>
						))}
						{/* <Link
						className={`links ${pageIndex == 1 ? "active" : ""}`}
						to="tasklist"
						onClick={() => setPageIndex(1)}
					>
						<div className="icon">
							<img src={tasks} alt="icon" className="imgicon" />
						</div>
						Tasks
					</Link>
					<Link
						className={`links ${pageIndex == 2 ? "active" : ""}`}
						to="employeeList"
						onClick={() => setPageIndex(2)}
					>
						<div className="icon">
							<img src={employees} alt="icon" className="imgicon" />
						</div>
						Employees
					</Link> */}
					</div>
					<div className="bottom">
						<div className="links" onClick={handleLogout}>
							<div className="icon">
								<img src={logout} alt="icon" className="imgicon" />
							</div>
							<label>Log-out</label>
						</div>
					</div>
				</aside>

				<div className="content">
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default HomeLayout;
