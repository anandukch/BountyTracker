const GridDataColumn = ({name,id,bounty,birthday,role,tier}) =>{
    
    return(
        <div className="listDataSet">
            {/* <div className="employeeId">
                {id}
            </div> */}
            <div className="employeeID">
                {id}
            </div>
            <div className="employeeName">
                {name}
            </div>
            <div className="employeeBirthday">
                {birthday}
            </div>
            <div className="employeePhone">
                {role}
            </div>
            <div className="employeeBounty">
                {bounty} Kyns
            </div>
            <div className="employeeTier">
                {tier}
            </div>
            
          
            
        </div>
    )
    }
    export default GridDataColumn