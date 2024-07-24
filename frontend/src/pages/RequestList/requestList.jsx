import IconFilter from "../../assets/iconFilter.png"
import Search from "../../components/Search/Search";
import GridColumn from "../../components/GridColumn";
import "../RequestList/requestList.scss"
import { useState, useEffect } from "react";
import { formatDate } from "../../utils/date.utils";
import GridRequestColumn from "../../components/GridRequestColumn"
const dummyRequests=[
    {id:1,name:"John Doe",requestTime:"23-07-2024",totalBounty:1200},
    {id: 2, name: "Jane Smith", requestTime: "24-07-2024", totalBounty:900},
    {id: 3, name: "Robert Brown", requestTime: "22-07-2024", totalBounty:800},
    {id: 4, name: "Emily Johnson", requestTime: "21-07-2024", totalBounty:700},
    {id: 5, name: "Michael Davis", requestTime: "23-07-2024", totalBounty:600},
    {id: 6, name: "Jessica Wilson", requestTime: "20-07-2024", totalBounty:3000}
]
const RequestList=() =>{
    const [list, setList]=useState([]);
    useEffect(()=>{
        // if (isSuccess){
            const formattedTime= dummyRequests.map((requestList)=>({
                ...requestList,
                requestTime:formatDate(requestList.requestTime)
    
            }));
            setList(formattedTime)
        // }
       

    }, [dummyRequests])
    
    const columns = [
		// { name:"Emplouee ID"},
		{ name: "Employee Name" },
        { name: "Employee ID" },
		{ name: "Request Time" },
		{ name: "Tier" },
        {name: "Action"}
	];
    return(
        <div className="requestWrap">
            <div className="wrapHeading">
				<h1>Requests List</h1>
				<div className="searchSort">
					<Search/>
					<div className="sort">
						<label></label>
						<img src={IconFilter} alt="filter"></img>
						<select id="tier" name="tier">
							<option value="" disabled selected>
								Filter
							</option>
							<option value="high">Request Time ▼</option>
							<option value="low">Request Time ▲</option>
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
                    {list.map((requestList)=>{
                        return(
                            <GridRequestColumn
                            key={requestList.id}
                            name={requestList.name}
                            id={requestList.id}
                            requestTime={requestList.requestTime}
                            bounty={requestList.totalBounty}
                            />
                        )
                    })}
                </div>

            </div>
        </div>
    )




}
export default RequestList;