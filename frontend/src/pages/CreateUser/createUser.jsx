import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import FormComponent from "../../components/FormComponent/FormComponent";
import "./styles.scss";
const CreateUser = () => {
   const [formData, setFormData] = useState({});
   const form_fields = [
      {
         name: "Username",
         id: "name",
         type: "text",
      },
      {
         id: "email",
         name: "Email",
         type: "email",
      },
      {
         id: "birthday",
         name: "Birthday",
         type: "date",
      },
      {
         id: "password",
         name: "Password",
         type: "password",
      },
      {
         id: "phone",
         name: "Phone",
         type: "number",
      },
      {
         id: "role",
         name: "Role",
         values: [{ option: "UX" }, { option: "UI" }, { option: "HR" }, { option: "Developer" }],
         Component: Select,
      },
      {
         id: "address",
         name: "Address",
         type: "text",
      },
      {
         id: "pincode",
         name: "Pincode",
         type: "number",
      },
   ];
   const handleChange = (props) => {
      setFormData((prevState) => {
         if (formData.type === "Individual") delete formData.maxParticipants;
         return { ...prevState, ...props };
      });
   };
   useEffect(() => {
      console.log(formData);
   }, [formData]);
   return (
      <main className="createUser">
         <h1>Register</h1>
         <FormComponent formFields={form_fields} onChange={handleChange} />
         <div className="formButtons">
            <Button text="Create" className="create" />
            <Button text="Cancel" className="cancel" />
         </div>
      </main>
   );
};
export default CreateUser;
