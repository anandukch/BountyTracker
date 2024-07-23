/* eslint-disable react/prop-types */
import "../pages/styles2.css"
import { RiPencilLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Status from "./status";
 
const TaskRow = (props) => {

const navigate = useNavigate();
const handledisplay=()=>
    {
      navigate(`/employee/details/${props.employeeid}`);
    }
  return (
  
    <div className="content-table">
   
    <div onClick={handledisplay}> {props.taskid}</div>
    <div onClick={handledisplay}> {props.taskname}</div>
    <div onClick={handledisplay}> {props.assignedby}</div>
    <div onClick={handledisplay}> {props.startdate}</div>
    <div onClick={handledisplay}> {props.duedate}</div>
    <div onClick={handledisplay}> {props.participants}</div>
    <div onClick={handledisplay}> {props.koyns}</div>
    </div>
  );
};
export default TaskRow;
