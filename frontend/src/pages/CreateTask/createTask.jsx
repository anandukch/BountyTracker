import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import FormComponent from "../../components/FormComponent/FormComponent";
import "./styles.scss";
import Select from "../../components/Select/Select";
import { useCreateTaskMutation } from "../../api/taskApi";

const initialFormData = {
	title: "",
	description: "",
	deadLine: "",
	startDate: "",
	skills: "",
	totalBounty: "",
	maxParticipants: "",
};
const CreateTask = () => {
	const [formData, setFormData] = useState(initialFormData);
	const [createTask, { data, isSuccess, isLoading }] = useCreateTaskMutation();
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
			name: "totalBounty",
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
			name: "deadLine",
		},

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
		{
			id: "maxParticipants",
			label: "Max Participants",
			type: "number",
			name: "maxParticipants",
		},
	];

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const createTaskHandler = () => {
		createTask({
			...formData,
			totalBounty: parseInt(formData.totalBounty),
			maxParticipants: parseInt(formData.maxParticipants),
		});
	};

	useEffect(() => {
		if (isSuccess) {
			console.log(data);
		}
	}, [isSuccess, data]);
	return (
		<main className="createTask">
			<div className="title">
				<span>Add Task </span>
				<div className="formButtons">
					<Button text="Create" className="create" onClick={createTaskHandler} />
					<Button text="Cancel" className="cancel" />
				</div>
			</div>
			<FormComponent formFields={formFields} onChange={handleChange} />
		</main>
	);
};
export default CreateTask;
