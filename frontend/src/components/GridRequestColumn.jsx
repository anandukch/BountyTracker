import Button from "./Button/Button"
const GridRequestColumn=({name,id,requestTime,bounty})=>{
    let tier;
    if (bounty>1500){
        tier="Diamond"
    }
    else if(bounty>1000){
        tier="Gold"
    }
    else{
        tier="Silver"
    }
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