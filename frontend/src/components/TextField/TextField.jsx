/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// import { useEffect, useState } from "react";

import "../components.scss";

import { forwardRef, useState } from "react";
const TextField = forwardRef((props, ref) => {
	const { onChange, type, label, className, error,name } = props;
	//  const onChange = (e) => {
	//      if (props.onChange) props.onChange(e.target.value, props.label);
	//   };
	return (
		<span className="TextField">
			<label htmlFor={label}>{label}</label>
			<input type={type} ref={ref} name={name} placeholder={label} onChange={onChange} />
			<label htmlFor="error" className="error_msg">
				{error}
			</label>
		</span>
	);
});
export default TextField;
