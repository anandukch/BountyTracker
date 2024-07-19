import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import FormComponent from "../../components/FormComponent/FormComponent";
import "./styles.scss";
const CreateTask = () => {
   const [formData, setFormData] = useState({});

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
         <FormComponent onChange={handleChange} />
      </main>
   );
};
export default CreateTask;
