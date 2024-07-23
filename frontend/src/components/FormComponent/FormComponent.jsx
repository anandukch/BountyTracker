/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import TextField from "../../components/TextField/TextField";
import Select from "../../components/Select/Select";

const FormComponent = ({ onChange, formFields }) => {
	// const [type, setType] = useState(false);

	// const handleChange = (props) => {
	// 	if (props.type === "Group") setType(true);
	// 	if (props.type === "Individual") setType(false);
	// 	onChange(props);
	// };
	return (
		<form className="formComponent">
			{formFields.map((field) => {
				if (field.type == "select")
					return (
						<Select
							key={field.id}
							label={field.label}
							name={field.name}
							values={field.values}
							className="fields"
							onChange={onChange}
						/>
					);
				else if (field.Component === "text-area")
					return (
						<div className="fieldsTextArea">
							<label>Description</label>
							<textarea key={field.id} name="description" rows="5" cols="40" onChange={onChange} />
						</div>
					);
				return (
					<TextField
						key={field.id}
						label={field.label}
						name={field.name}
						type={field.type}
						className="fields"
						// onChange={(value) => handleChange({ [field.id]: value })}
						onChange={onChange}
					/>
				);
			})}
			{/* {type ? (
					<TextField
						key="maxParticipants"
						label="Max Participants"
						name={field.name}
						type="number"
						className="fields"
						// onChange={(value) => handleChange({ ["maxParticipants"]: value })}
						onChange={onChange}
					/>
				) : null} */}
		</form>
	);
};
export default FormComponent;
