/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../pages/EmployeeTierList/employeeTierList.scss";
import GridDataColumn from "../../components/GridDataColumn";
import GridColumn from "../../components/GridColumn";
import SearchIcon from "../../assets/iconsearch.svg";
import IconFilter from "../../assets/iconFilter.png";
import Search from "../../components/Search/Search";
import { useGetEmployeeListQuery } from "../../api/employeeApi";
import { formatDate } from "../../utils/date.utils";

const EmployeeTierList = () => {
	const [list, setList] = useState([]);
	const { data, isLoading, isSuccess } = useGetEmployeeListQuery();
	console.log(data);
	useEffect(() => {
		if (isSuccess) {
			const formattedData = data.data.map((employee) => ({
				...employee,
				birthday: formatDate(employee.details.birthday),
			}));
			console.log(formattedData);
			setList(formattedData);
		}
	}, [data, isSuccess]);

	// useEffect(()=>{},[employee])

	const columns = [
		// { name:"Emplouee ID"},
		{ name: "Employee ID" },
		{ name: "Employee Name" },
		{ name: "Birthday" },
		{ name: "Role" },
		{ name: "KoYns" },
		{ name: "Tier" },
	];

	return (
		<div className="fullWrap">
			<div className="wrapHeading">
				<h1>Employees</h1>
				{/* <div className="searchSort">
					<Search />
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
				</div> */}
			</div>
			<div className="listWrapper">
				<div className="listHeader">
					{columns.map((column) => {
						return <GridColumn key={column.name} name={column.name} />;
					})}
				</div>
				<div className="listDataTier">
					{list.map((employee) => {
						console.log(employee);
						return (
							<GridDataColumn
								key={employee.id}
								name={employee.name}
								id={employee.id}
								bounty={employee.details.totalBounty}
								birthday={employee.birthday}
								role={employee.role}
								tier={employee.currentTier}
								platinumCount={employee.details.platinumCount}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default EmployeeTierList;
