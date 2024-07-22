import { Component, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import FormComponent from "../../components/FormComponent/FormComponent";
import "./styles.scss";
import { useAddEmployeeMutation } from "../../api/employeeApi";
import { useNavigate } from "react-router-dom";
const initalState = {
	name: "",
	email: "",
	birthday: "",
	password: "",
	phoneNo: "",
	role: "",
	address: "",
	pincode: "",
};
const RegisterEmployee = () => {
	const [formData, setFormData] = useState(initalState);
	const [addEmployee, { data, isSuccess, error, isError }] = useAddEmployeeMutation();
	const navigate = useNavigate();

	const form_fields = [
		{
			label: "Name",
			id: "name",
			type: "text",
			name: "name",
		},
		{
			id: "email",
			label: "Email",
			type: "email",
			name: "email",
		},
		{
			id: "birthday",
			label: "Birthday",
			type: "date",
			name: "birthday",
		},
		{
			id: "password",
			label: "Password",
			type: "password",
			name: "password",
		},
		{
			id: "gender",
			label: "Gender",
			Component: Select,
			values: [{ option: "Male" }, { option: "Female" }, { option: "Others" }],
			name: "gender",
		},
		{
			id: "phoneNo",
			label: "Phone",
			type: "text",
			name: "phoneNo",
		},
		{
			id: "role",
			label: "Role",
			values: [{ option: "Lead" }, { option: "Regular" }],
			Component: Select,
			name: "role",
		},
		{
			id: "address",
			label: "Address",
			type: "text",
			name: "address",
		},
	];
	const handleChange = (e) => {
		// setFormData((prevState) => {
		// 	if (formData.type === "Individual") delete formData.maxParticipants;
		// 	return { ...prevState, ...props };
		// });
		console.log(e.target.name);

		setFormData((prevState) => {
			return {
				...prevState,
				[e.target.name]: e.target.value,
			};
		});
	};

	const registerEmployeeHandler = () => {
		// TODO: Implement register employee handler
		addEmployee(formData);
		console.log(formData);
	};

	useEffect(() => {
		if (isError) {
		}
	}, [isError, error]);

	useEffect(() => {
		if (isSuccess) {
			navigate("/login");
		}
	}, [isSuccess, navigate]);

	return (
		<main className="RegisterEmployee">
			<h1>Register</h1>
			<FormComponent formFields={form_fields} onChange={handleChange} />
			<div className="formButtons">
				<Button text="Create" isPrimary={true} onClick={registerEmployeeHandler} />
				<Button text="Cancel" className="cancel" />
			</div>
		</main>
	);
};
export default RegisterEmployee;
