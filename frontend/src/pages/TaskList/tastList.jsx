import React, { useState, useEffect } from "react";
import "../TaskList/taskList.scss";
import GridDataColumn from "../../components/GridDataColumnList";
import GridColumn from "../../components/GridColumn";
import Search from "../../components/Search/Search";

// Dummy data
const dummyData = [
	{
		id: 1,
		taskid: "1",
		taskname: "Employee List",
		assignedby: "Manushi Chillet",
		startdate: "15-12-2002",
		duedate: "20-12-2002",
		participants: "4/5",
		koyns: 1200,
	},
	{
		id: 2,
		taskid: "2",
		taskname: "Project Proposal",
		assignedby: "Alex Smith",
		startdate: "01-08-2024",
		duedate: "10-08-2024",
		participants: "3/3",
		koyns: 800,
	},
	{
		id: 3,
		taskid: "3",
		taskname: "Marketing Campaign",
		assignedby: "Emma Johnson",
		startdate: "01-09-2024",
		duedate: "15-09-2024",
		participants: "2/4",
		koyns: 1500,
	},
	{
		id: 4,
		taskid: "4",
		taskname: "Website Redesign",
		assignedby: "John Doe",
		startdate: "01-07-2024",
		duedate: "05-07-2024",
		participants: "5/5",
		koyns: 1000,
	},
	{
		id: 5,
		taskid: "5",
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

	useEffect(() => {
		const formattedData = dummyData.map((employee) => ({
			...employee,
			duedate: new Date(employee.duedate).toLocaleDateString("en-GB", {
				day: "numeric",
				month: "short",
				year: "numeric",
			}),
		}));
		setList(dummyData);
	}, []);

	const columns = [
		{ name: "Task Id" },
		{ name: "Task Name" },
		{ name: "Assigned By" },
		{ name: "Start Date" },
		{ name: "Deadline" },
		{ name: "Participants" },
		{ name: "KoYns" },
	];

	return (
		<div className="fullWrap">
			<div className="wrapHeading">
				<h1>Task List</h1>
				<br></br>
				<div className="searchSort">
					{/* <img src={SearchIcon} alt="search"></img>
						<input type="text" placeholder="    Search here" /> */}
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
				<div className="listHeader">
					{columns.map((column) => {
						return <GridColumn key={column.name} name={column.name} />;
					})}
				</div>
				<div className="listData">
					{list.map((employee) => {
						return (
							<GridDataColumn
								key={employee.taskid}
								taskid={employee.taskid}
								taskname={employee.taskname}
								assignedby={employee.assignedby}
								startdate={employee.startdate}
								duedate={employee.duedate}
								// id={employee.id}
								participants={employee.participants}
								koyns={employee.koyns}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default TaskList;
