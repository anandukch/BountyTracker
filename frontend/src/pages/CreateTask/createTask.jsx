import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import FormComponent from "../../components/FormComponent/FormComponent";
import "./styles.scss";
import Select from "../../components/Select/Select";

const initialFormData = {
	title: "",
	description: "",
	dueDate: "",
	startDate: "",
	skills: "",
	bounty: "",
	maxParticipants: "",
};
const CreateTask = () => {
	const [formData, setFormData] = useState(initialFormData);
	const formFields = [
		{
			id: "name",
			label: "Task Name",
         name: "title",
			type: "text",
		},
		{
			id: "bounty",
			label: "Bounty",
         name: "bounty",
			type: "number",
		},
		{
			id: "description",
			label: "Description",
			type: "text",
         name: "description",
			Component: "text-area",
		},
		{
			id: "due date",
			label: "Due Date",
			type: "date",
         name:"deadLine"
		},
		// {
		//    id: "type",
		//    label: "Type",
		//    values: [{ option: "Individual" }, { option: "Group" }],
		//    Component: Select,
		// },
		{
			id: "Start Date",
			label: "Start Date",
			type: "date",
         name: "startDate",
		},
		{
			id: "skills",
			label: "Skills",
			type: "text",
         name: "skills",
		},
	];
	const handleChange = (e) => {
		setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
     }));
	};
	const createTaskHandler = () => {
      console.log(formData);
      console.log("Task Created");
   }
	return (
		<main className="createTask">
			<div className="title">
				<span>Add Task </span>
				<div className="formButtons">
					<Button text="Create" className="create" onClick={createTaskHandler}/>
					<Button text="Cancel" className="cancel" />
					{/* <Link to="/employees" className="cancelLink"> */}
					{/* </Link> */}
				</div>
			</div>
			<FormComponent formFields={formFields} onChange={handleChange} />
		</main>
	);
};
export default CreateTask;
