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

const TaskList = () => {
	const [list, setList] = useState([]);
	const { data, isLoading, isSuccess } = useGetTaskListQuery();

	useEffect(() => {
		if (isSuccess) {
			const formattedData = data.data.filter((task) => task.status == "Yet to start");
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
					{isSuccess &&
						list.map((employee) => {
							return (
								<FetchListRow
									key={employee.id}
									taskid={employee.id}
									taskname={employee.title}
									assignedby={employee.createdBy.name}
									startdate={employee.startDate}
									duedate={employee.deadLine}
									participants={`${employee.currentParticipants}/${employee.maxParticipants}`}
									koyns={employee.totalBounty}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default TaskList;
