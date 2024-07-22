import "./styles.scss";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../api/loginApi";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login, { isSuccess, data }] = useLoginMutation();
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess) {
			localStorage.setItem("token", data.token);
			navigate("/user");
		}
	}, [data, isSuccess, navigate]);

	const passwordChangeHandler = (e) => {
		setPassword(e.target.value);
	};

	const emailChangeHandler = (e) => {
		setEmail(e.target.value);
	};

	const onButtonClick = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<div className="login">
			<h1>Login</h1>
			<form action="/" method="post">
				<TextField label="Username" name="email" type="text" className="fields" onChange={emailChangeHandler} />
				<TextField
					label="Password"
					type="password"
					className="fields"
					name="password"
					onChange={passwordChangeHandler}
				/>
				<Button text="Login" className="" onClick={onButtonClick} />
			</form>

			<span>
				New to KoYns..?{" "}
				<Link className="registerLink" to="register">
					Register
				</Link>
			</span>
		</div>
	);
};
export default Login;
