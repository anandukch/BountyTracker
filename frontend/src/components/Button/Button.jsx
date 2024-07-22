/* eslint-disable react/prop-types */
const Button = ({ text, className, onClick, type, isPrimary }) => {
	return (
		<button className={`formButton ${isPrimary ? "primary" : ""} ${className}`} onClick={onClick} type={type}>
			{text}
		</button>
	);
};

export default Button;
