import IconFilter from "../../assets/iconFilter.png";
import Search from "../../components/Search/Search";
import GridColumn from "../../components/GridColumn";
import "../RequestList/requestList.scss";
import { useState, useEffect } from "react";
import { formatDate } from "../../utils/date.utils";
import GridRequestColumn from "../../components/GridRequestColumn";
import { useApproveRedeemRequestMutation, useGetRedeemRequestsQuery } from "../../api/employeeApi";

const dummyRequests = [
	{ id: 1, name: "John Doe", requestTime: "23-07-2024", currentTier: "gold" },
	{ id: 2, name: "Jane Smith", requestTime: "24-07-2024", currentTier: "gold" },
	{ id: 3, name: "Robert Brown", requestTime: "22-07-2024", currentTier: "silver" },
	{ id: 4, name: "Emily Johnson", requestTime: "21-07-2024", currentTier: "gold" },
	{ id: 5, name: "Michael Davis", requestTime: "23-07-2024", currentTier: "platinum" },
	{ id: 6, name: "Jessica Wilson", requestTime: "20-07-2024", currentTier: "gold" },
];
const RequestList = () => {
	const { data: redeemRequests, isSuccess } = useGetRedeemRequestsQuery();
	const [approve, { isSuccess: approveSuccess }] = useApproveRedeemRequestMutation();
	const handleApprove = (props) => {
		console.log(props);
		const data = {
			employeeId: props.id,
			requestId: props.commentId,
			status: props.status,
		};
		console.log(data);
		approve(data);
	};

	const columns = [
		// { name:"Emplouee ID"},
		{ name: "Employee ID" },
		{ name: "Employee Name" },
		{ name: "Request Time" },
		{ name: "Tier" },
		{ name: "Action" },
	];
	return (
		<div className="requestWrap">
			<div className="wrapHeading">
				<h1>Requests List</h1>
			</div>
			<div className="listWrapper">
				<div className="listHeader">
					{columns.map((column) => {
						return <GridColumn key={column.name} name={column.name} />;
					})}
				</div>
				<div className="listData">
					{redeemRequests?.data?.map((request) => {
						return (
							<GridRequestColumn
								key={request.id}
								name={request.employee.name}
								id={request.employee.id}
								requestTime={formatDate(request.createdAt)}
								tier={request.currentTier}
								onApprove={({ id: id, commentId: commentId, status: status }) =>
									handleApprove({ id: id, commentId: commentId, status: status })
								}
								onReject={({ id: id, commentId: commentId, status: status }) =>
									handleApprove({ id: id, commentId: commentId, status: status })
								}
								commentId={request.id}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default RequestList;
