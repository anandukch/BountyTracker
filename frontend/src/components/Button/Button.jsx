/* eslint-disable react/prop-types */
import "../Button/Button.scss";
const Button = ({ text, className, onClick, type, isPrimary, isDisabled = false }) => {
	return (
		<button
			className={`formButton ${isPrimary ? "primary" : ""} ${className}`}
			onClick={onClick}
			type={type}
			disabled={isDisabled}
		>
			{text}
		</button>
	);
};

export default Button;
