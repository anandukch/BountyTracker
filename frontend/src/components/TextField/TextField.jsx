/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// import { useEffect, useState } from "react";

import { forwardRef, useState } from "react";
const TextField = forwardRef((props, ref) => {
	const { onChange, type, label, className, error } = props;
	//  const onChange = (e) => {
	//      if (props.onChange) props.onChange(e.target.value, props.label);
	//   };
	return (
		<span className={className}>
			<label htmlFor={label}>{label}</label>
			<input type={type} ref={ref} name={label} placeholder={label} onChange={onChange} />
			<label htmlFor="error" className="error_msg">
				{error}
			</label>
		</span>
	);
});
export default TextField;
