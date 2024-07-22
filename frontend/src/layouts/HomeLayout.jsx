import { Link, Outlet, useNavigate } from "react-router-dom";
import "./styles.scss";
import profile from "../assets/profile-img.svg";
import tasks from "../assets/tasks.svg";
import employees from "../assets/employees.svg";
import logout from "../assets/logout.svg";
import logo from "../assets/KoYns-Logo.png";
import text from "../assets/KoYns-Text.png";
const HomeLayout = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.clear("token");
		navigate("/login");
	};
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
					<Link className="links" to="/employee">
						<div className="details">
							<div className="icon">
								<img src={profile} alt="icon" className="imgicon" />
							</div>
							<label> Profile</label>
						</div>
					</Link>
					<Link className="links" to="taskDetail">
						<div className="details">
							<div className="icon">
								<img src={tasks} alt="icon" className="imgicon" />
							</div>
							<label>Tasks</label>
						</div>
					</Link>
					<Link className="links" to="employeeList">
						<div className="details">
							<div className="icon">
								<img src={employees} alt="icon" className="imgicon" />
							</div>
							<label>Employees</label>
						</div>
					</Link>
				</div>
				<div className="details" onClick={handleLogout}>
					<div className="icon">
						<img src={logout} alt="icon" className="imgicon" />
					</div>
					<label>Log-out</label>
				</div>
			</aside>

			<div className="content">
				<Outlet />
			</div>
		</div>
	);
};

export default HomeLayout;
