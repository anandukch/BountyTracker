import Button from "./Button/Button"
const GridRequestColumn=({name,id,requestTime,tier})=>{
    
    return(
        <div className="listDataSet">
           
            <div className="employeeId">
                {id}
            </div>
            <div className="employeeName">
                {name}
            </div>
            <div className="requestTime">
                {requestTime}
            </div>
            <div className="tier">
                {tier}
            </div>
            <div className="buttons">
            <Button text="Approve" isPrimary={true}  />
			<Button text="Reject" className="cancel"  />
            
            </div>
            
            
          
            
        </div>
    )
}
export default GridRequestColumn