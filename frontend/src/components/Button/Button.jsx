/* eslint-disable react/prop-types */
import React from "react";
const Button = ({ text, className, onClick, type }) => {
	return (
		<button className={className} onClick={onClick} type={type}>
			{text}
		</button>
	);
};

export default Button;
