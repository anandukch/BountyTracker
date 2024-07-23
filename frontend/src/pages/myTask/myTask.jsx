import React, { useState, useEffect } from "react";
import "./style.scss";
import GridDataColumn from "../../components/GridDataColumnList";
import GridColumn from "../../components/GridColumn";
import Search from "../../components/Search/Search";
import { useNavigate } from "react-router-dom";
import GridDataColumnList from "../../components/GridDataColumnList";
import { Loader } from "../../components/Loader/Loader";
import { formatDate } from "../../utils/date.utils";
import FetchListRow from "../../components/MyTaskRow";
import FetchMyListRow from "../../components/MyTaskFetchedRow";
import { useGetEmployeeCreatedTasksQuery } from "../../api/employeeApi";

const MyTask = () => {
	const [list, setList] = useState([]);
	const { data, isLoading, isSuccess } = useGetEmployeeCreatedTasksQuery();

	useEffect(() => {
		if (isSuccess) {
			const formattedData = data.data.map((task) => ({
				...task,
				startDate: formatDate(task.startDate),
				deadLine: formatDate(task.deadLine),
			}));
			console.log(data);
			setList(formattedData);
		}
	}, [data, isSuccess]);

	const columns = [
		// { name: "Task Id" },
		{ name: "Task Name" },
		{ name: "Start Date" },
		{ name: "Deadline" },
		{ name: "Joined" },
		{ name: "Status" },
		{ name: "Progress" },
		{ name: "KoYns" },
	];
	const index=[2,4];
	const count=[0,3,0,1,0];

	return (
		<div className="fullWrap">
			{isLoading && <Loader />}
			<div className="wrapHeading">
				<h1>My Task List</h1>
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
				<div className="listHeaderMyTask">
					{columns.map((column) => {
						return <GridColumn key={column.name} name={column.name} />;
					})}
				</div>
				<div className="listData">
					{list.map((employee) => {
						return (
							<FetchMyListRow
								key={employee.id}
								taskid={employee.id}
								taskname={employee.title}
								progress={employee.currentContribution}
								startdate={employee.startDate}
								duedate={employee.deadLine}
								taskStatus={employee.status}
								participants={`${employee.currentParticipants}/${employee.maxParticipants}`}
								koyns={employee.totalBounty}
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

export default MyTask;
