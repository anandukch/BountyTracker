import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";
import profile from "../assets/profile-img.svg";
import profileHead from "../assets/profile.png";
import tasks from "../assets/tasks.svg";
import employees from "../assets/employees.svg";
import logout from "../assets/logout.svg";
import logo from "../assets/KoYns-Logo.png";
import text from "../assets/KoYns-Text.png";
import requests from "../assets/requests.svg";
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

	const state = useSelector((state) => state.employee.employee);

	const handleLogout = () => {
		localStorage.clear("token");
		navigate("/login");
	};
	const { data: employeeData, isError, isSuccess } = useGetProfileQuery();
	const dispatch = useDispatch();

	const toastMessages = useSelector((state) => state.toasts.toastMessages);

	useEffect(() => {
		if (isSuccess) {
			dispatch(addLoggedState(employeeData.data));
		}

		if (isError) {
			localStorage.clear("token");
			navigate("/login");
		}
	}, [employeeData, isSuccess, dispatch, isError, navigate]);

	const sideBar = [
		{
			id: 0,
			title: "Tasks",
			icon: tasks,
			to: "/tasks",
			render: true,
		},
		{
			id: 1,
			title: "Employees",
			icon: employees,
			to: "/employees",
			render: true,
		},

		{
			id: 2,
			title: "Requests",
			icon: requests,
			to: "/requests",
			render: state.role == "HR",
		},
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
								navigate("/profile");
							}}
						>
							<img src={profileHead} alt="Profile Icon" />
							{state.name}
						</span>
					</h2>
				</div>
				<aside className="HomeLayout">
					<div className="top">
						{sideBar
							.filter((item) => item.render)
							.map((item, index) => (
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
