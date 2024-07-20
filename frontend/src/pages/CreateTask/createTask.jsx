import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import FormComponent from "../../components/FormComponent/FormComponent";
import "./styles.scss";
import Select from "../../components/Select/Select";
const CreateTask = () => {
   const [formData, setFormData] = useState({});
   const form_fields=[
      {
         id: "name",
         name: "Task Name",
         type: "text",
      },
      {
         id: "bounty",
         name: "Bounty",
         type: "number",
      },
      {
         id: "description",
         name: "Description",
         type: "text",
         Component: "text-area",
      },
      {
         id: "due date",
         name: "Due Date",
         type: "date",
      },
      {
         id: "type",
         name: "Type",
         values: [{ option: "Individual" }, { option: "Group" }],
         Component: Select,
      },
      {
         id: "skills",
         name: "Skills",
         type: "text",
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
      <main className="createTask">
         <div className="title">
            <span>Add Task </span>
            <div className="formButtons">
               <Button text="Create" className="create" />
               <Button text="Cancel" className="cancel" />
               {/* <Link to="/employees" className="cancelLink"> */}
               {/* </Link> */}
            </div>
         </div>
         <FormComponent formFields = {form_fields} onChange={handleChange} />
      </main>
   );
};
export default CreateTask;
