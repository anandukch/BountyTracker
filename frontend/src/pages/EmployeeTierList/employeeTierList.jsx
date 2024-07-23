/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../pages/EmployeeTierList/employeeTierList.scss";
import GridDataColumn from "../../components/GridDataColumn";
import GridColumn from "../../components/GridColumn";
import SearchIcon from "../../assets/iconsearch.svg";
import IconFilter from "../../assets/iconFilter.png";
import Search from "../../components/Search/Search";
// Dummy data
const dummyData = [
	{ id: 1, name: "John Doe", gender: "Male", birthday: "20-12-2002", phone: "930708788", bounty: 1200 },
	{ id: 2, name: "Jane Smith", gender: "Female", birthday: "20-12-2002", phone: "930708788", bounty: 90 },
	{ id: 3, name: "Alice Johnson", gender: "Female", birthday: "20-12-2002", phone: "930708788", bounty: 150 },
	{ id: 4, name: "Bob Brown", gender: "Male", birthday: "20-12-2002", phone: "930708788", bounty: 700 },
];

const EmployeeTierList = () => {
	const [list, setList] = useState([]);

	useEffect(() => {
		const formattedData = dummyData.map((employee) => ({
			...employee,
			birthday: new Date(employee.birthday).toLocaleDateString("en-GB", {
				day: "numeric",
				month: "short",
				year: "numeric",
			}),
		}));
		setList(dummyData);
	}, []);

	const columns = [
		// { name:"Emplouee ID"},
		{ name: "Employee Name" },
		{ name: "Gender" },
		{ name: "Birthday" },
		{ name: "Phone" },
		{ name: "KoYns" },
		{ name: "Tier" },
	];

	return (
		<div className="fullWrap">
			<div className="wrapHeading">
				<h1>Employee List</h1>
				<div className="searchSort">
					<Search/>
					<div className="sort">
						<label></label>
						<img src={IconFilter} alt="filter"></img>
						<select id="tier" name="tier">
							<option value="" disabled selected>
								Filter
							</option>
							<option value="bountyHigh">Tier ▼</option>
							<option value="bountyLow">Tier ▲</option>
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
								key={employee.id}
								name={employee.name}
								// id={employee.id}
								gender={employee.gender}
								bounty={employee.bounty}
								birthday={employee.birthday}
								phone={employee.phone}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default EmployeeTierList;
