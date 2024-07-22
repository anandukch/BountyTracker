import { useState } from "react";

const Select = ({ values, label, name, className, onChange }) => {
	//  const handleSelect = (e) => {
	//      if (onSelect) onSelect(e.target.value, label);
	//   };
	return (
		<span className={className}>
			<label htmlFor={label}> {label} </label>
			<select defaultValue="default" onChange={onChange} name={name}>
				<option value="default" disabled>
					{label}
				</option>
				{values.map((element) => {
					return (
						<option key={element.option} value={element.option}>
							{element.option}
						</option>
					);
				})}
			</select>
		</span>
	);
};
export default Select;
