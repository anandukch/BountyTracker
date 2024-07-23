import { Outlet } from "react-router-dom";
import "./styles.scss";
// import logo from "../../assets/KoYns-Logo.png";
import logo from "../../assets/logo.jpg";
import text from "../../assets/KoYns-Text.png";
import { useSelector } from "react-redux";
import Toast from "../Toast/customToast";
const Hero = () => {
	const toastMessages = useSelector((state) => state.toasts.toastMessages);
	console.log(toastMessages);

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
			<div className="loginPage">
				<div className="hero">
					<div className="wrapper-hero">
						<div className="login-image">
							<img src={logo} alt="Login Image" className="logo-image" />
						</div>

						<img src={text} alt="Logo Text" className="logo-text" />
					</div>
				</div>
				<div className="outlet">
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default Hero;
