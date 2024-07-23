import React, { useState, useEffect } from "react";
import "../TaskList/taskList.scss";
import GridDataColumn from "../../components/GridDataColumnList";
import GridColumn from "../../components/GridColumn";
import Search from "../../components/Search/Search";
import { useNavigate } from "react-router-dom";
import GridDataColumnList from "../../components/GridDataColumnList";
import { useGetTaskListQuery } from "../../api/taskApi";
import { Loader } from "../../components/Loader/Loader";
import { formatDate } from "../../utils/date.utils";
import FetchListRow from "../../components/MyTaskRow";

// Dummy data
const dummyData = [
	{
		id: 1,
		taskid: 1,
		taskname: "Employee List",
		assignedby: "Manushi Chillet",
		startdate: "15-12-2002",
		duedate: "20-12-2002",
		participants: "4/5",
		koyns: 1200,
	},
	{
		id: 2,
		taskid: 2,
		taskname: "Project Proposal",
		assignedby: "Alex Smith",
		startdate: "01-08-2024",
		duedate: "10-08-2024",
		participants: "3/3",
		koyns: 800,
	},
	{
		id: 3,
		taskid: 3,
		taskname: "Marketing Campaign",
		assignedby: "Emma Johnson",
		startdate: "01-09-2024",
		duedate: "15-09-2024",
		participants: "2/4",
		koyns: 1500,
	},
	{
		id: 4,
		taskid: 4,
		taskname: "Website Redesign",
		assignedby: "John Doe",
		startdate: "01-07-2024",
		duedate: "05-07-2024",
		participants: "5/5",
		koyns: 1000,
	},
	{
		id: 5,
		taskid: 5,
		taskname: "Budget Review",
		assignedby: "Maria Garcia",
		startdate: "10-08-2024",
		duedate: "25-08-2024",
		participants: "1/2",
		koyns: 600,
	},
];

const TaskList = () => {
	const [list, setList] = useState([]);
	const { data, isLoading, isSuccess } = useGetTaskListQuery();

	useEffect(() => {
		if (isSuccess) {
			const formattedData = data.data.map((task) => ({
				...task,
				startDate: formatDate(task.startDate),
				deadLine: formatDate(task.deadLine),
			}));
			console.log(formattedData);
			setList(formattedData);
		}
	}, [data, isSuccess]);

	const columns = [
		// { name: "Task Id" },
		{ name: "Task Name" },
		{ name: "Assigned By" },
		{ name: "Start Date" },
		{ name: "Deadline" },
		{ name: "Participants" },
		{ name: "KoYns" },
	];
const index=[2,4];
const count=[0,3,0,1,0];
	return (
		<div className="fullWrap">
			{isLoading && <Loader />}
			<div className="wrapHeading">
				<h1>Task List</h1>
				<br></br>
				<div className="searchSort">
					<Search />
					<div className="sort">
						<label htmlFor="sortBy"></label>

						<select id="tier" name="tier">
							<option value="" disabled>
								Filter
							</option>
							<option value="bountyHigh"> ▼</option>

							<option value="bountyLow">▲</option>
						</select>
					</div>
				</div>
			</div>
			<div className="listWrapper">
				<div className="listHeaderTask">
					{columns.map((column) => {
						return <GridColumn key={column.name} name={column.name} />;
					})}
				</div>
				<div className="listData">
					{list.map((employee) => {
						return (
							<FetchListRow
								key={employee.id}
								taskid={employee.id}
								taskname={employee.title}
								assignedby={employee.createdBy.name}
								startdate={employee.startDate}
								duedate={employee.deadLine}
								participants={`${employee.currentParticipants}/${employee.maxParticipants}`}
								koyns={employee.koyns}
								index={index}
								count={count}
								
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default TaskList;
