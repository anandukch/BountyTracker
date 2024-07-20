const GridDataColumn = ({name,id,bounty,birthday,gender,phone}) =>{
let tier;
if (bounty>300){
    tier="Diamond"
}
else if(bounty>200){
    tier="Gold"
}
else{
    tier="Silver"
}
return(
    <div className="listDataSet">
        {/* <div className="employeeId">
            {id}
        </div> */}
        <div className="employeeName">
            {name}
        </div>
        <div className="employeeGender">
            {gender}
        </div>
        <div className="employeeBirthday">
            {birthday}
        </div>
        <div className="employeePhone">
            {phone}
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