/* eslint-disable react/jsx-key */
import TextField from "../../components/TextField/TextField";
import Select from "../../components/Select/Select";
import { useState } from "react";

const FormComponent = ({ onChange, formFields }) => {
	const [type, setType] = useState(false);
	const form_fields = formFields;
	const handleChange = (props) => {
		if (props.type === "Group") setType(true);
		if (props.type === "Individual") setType(false);
		onChange(props);
	};
	return (
		<form>
			<div className="formComponent">
				{form_fields.map((field) => {
					if (field.Component == Select)
						return (
							<field.Component
								key={field.id}
								label={field.label}
								values={field.values}
								name={field.name}
								className="fields"
								onSelect={(value) => handleChange({ [field.id]: value })}
							/>
						);
					else if (field.Component === "text-area")
						return (
							<div className="fieldsTextArea">
								<label>Description</label>
								<textarea key={field.id} name={field.name} rows="5" cols="40" onChange={onChange} />
							</div>
						);
					return (
						<TextField
							key={field.id}
							label={field.label}
							type={field.type}
							className="fields"
							name={field.name}
							onChange={onChange}
						/>
					);
				})}
				{type ? (
					<TextField
						key="maxParticipants"
						label="Max Participants"
						type="number"
						className="fields"
                  name = "maxParticipants"
						// onChange={(value) => handleChange({ ["maxParticipants"]: value })}
                  onChange={onChange}
					/>
				) : null}
			</div>
		</form>
	);
};
export default FormComponent;
