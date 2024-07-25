import { Link } from "react-router-dom";
import "./notFoundStyles.scss";
import exit_icon from "../../assets/exit.svg";
import simp_icon from "../../assets/simpsonsExit.png";
const NotFound = () => {
	return (
		<div className="errorMsg">
			<div className="errorCode">404</div>
			<h1>Not Found</h1>
			<img src={simp_icon} className="simpsonImg" alt="simpsons image" />
			<Link to="/login">
				<img src={exit_icon} className="exitIcon" alt="exit icon" />
			</Link>
		</div>
	);
};
export default NotFound;
