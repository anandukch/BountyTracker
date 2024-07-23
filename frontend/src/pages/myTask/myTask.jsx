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
import Button from "../../components/Button/Button";

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

	return (
		<div className="MyTask">
			{isLoading && <Loader />}
			<div className="wrapHeading">
				<h1>My Task List</h1>
				<br></br>
				<div className="searchSort">
					<Search />
					<span className="toolbarRight">
						{/* <div className="sort">
							<label htmlFor="sortBy"></label>

							<select id="tier" name="tier">
								<option value="" disabled>
									Filter
								</option>
								<option value="bountyHigh">▼</option>

								<option value="bountyLow">▲</option>
							</select>
						</div> */}
						<Button text="Add Task" isPrimary={true} onClick={() => navigate("create")} />
					</span>
				</div>
			</div>
			<div className="listWrapper">
				<div className="listHeaderMyTask">
					{columns.map((column) => {
						return <GridColumn key={column.name} name={column.name} />;
					})}
				</div>
				<div className="listData">
					{list.map((task) => {
						return (
							<FetchMyListRow
								key={task.id}
								taskid={task.id}
								taskname={task.title}
								progress={task.currentContribution}
								startdate={task.startDate}
								duedate={task.deadLine}
								taskStatus={task.status}
								participants={`${task.currentParticipants}/${task.maxParticipants}`}
								koyns={task.totalBounty}
								reviewPendingCount={task.reviewCommentCount}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default MyTask;
