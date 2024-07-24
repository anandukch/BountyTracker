import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import FormComponent from "../../components/FormComponent/FormComponent";
import "./styles.scss";
import { useCreateTaskMutation } from "../../api/taskApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToastMessage } from "../../store/toastReducer";
import { v4 } from "uuid";

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
	const [createTask, { data, isSuccess, isError, error }] = useCreateTaskMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
			navigate(-1);
		}
	}, [isSuccess, data, navigate]);

	useEffect(() => {
		if (isError) {
			console.log(error.data);
			dispatch(
				addToastMessage({
					id: v4(),
					status: "error",
					message: error?.data?.message,
				}),
			);
			error?.data?.error?.map((errorMessage) => {
				dispatch(
					addToastMessage({
						id: v4(),
						status: "error",
						message: errorMessage,
					}),
				);
			});
		}
	}, [isError, error, dispatch]);

	return (
		<main className="createTask">
			<div className="title">Add Task</div>
			<section className="taskFormWrap">
				<FormComponent formFields={formFields} onChange={handleChange} />
				<div className="formButtons">
					<Button text="Create" isPrimary={true} onClick={createTaskHandler} />
					<Button text="Cancel" className="cancel" onClick={() => navigate(-1)} />
				</div>
			</section>
		</main>
	);
};
export default CreateTask;
