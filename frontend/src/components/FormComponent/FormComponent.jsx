/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import TextField from "../../components/TextField/TextField";
import Select from "../../components/Select/Select";

const FormComponent = ({ onChange, formFields }) => {
	return (
		<form className="formComponent">
			{formFields.map((field) => {
				if (field.type == "select")
					return (
						<Select
							key={field.label}
							label={field.label}
							name={field.name}
							values={field.values}
							className="fields"
							onChange={onChange}
						/>
					);
				else if (field.Component === "text-area")
					return (
						<div className="fieldsTextArea" key={field.id}>
							<label>Description</label>
							<textarea name="description" rows="5" placeholder="Description" onChange={onChange} />
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
