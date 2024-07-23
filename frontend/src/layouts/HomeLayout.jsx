import { Link, Outlet, useNavigate } from "react-router-dom";
import "./styles.scss";
import profile from "../assets/profile-img.svg";
import tasks from "../assets/tasks.svg";
import employees from "../assets/employees.svg";
import logout from "../assets/logout.svg";
import logo from "../assets/KoYns-Logo.png";
import text from "../assets/KoYns-Text.png";
import myTask from "../assets/myTask.svg";
import { useState } from "react";
const HomeLayout = () => {
	const [pageIndex, setPageIndex] = useState(0);
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.clear("token");
		navigate("/login");
	};

	const sideBar = [
		{
			id: 0,
			title: "Profile",
			icon: profile,
			to: "/profile",
		},
		{
			id: 1,
			title: "Tasks",
			icon: tasks,
			to: "/tasks",
		},
		{
			id: 2,
			title: "Employees",
			icon: employees,
			to: "/employees",
		},
		{
			id: 3,
			title: "My Tasks",
			icon: myTask,
			to: "myTasks",
		},
	];

	return (
		<div className="page">
			<div className="header">
				<div className="logo">
					<img src={logo} alt="icon" className="logo-image" />
					<img src={text} alt="icon" className="logo-text" />
				</div>
				<h1>Bounty Tracker System</h1>
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
							className={`links ${pageIndex == index ? "active" : ""}`}
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
	);
};

export default HomeLayout;
