// const GridColumn=({name})=>{
//     return(
//         <div className="listHeadings">
//             <h4>{name}</h4>
//         </div>
//     )
// }
// export default GridColumn
import React from 'react';
import Uparrow from "../assets/up-arrow.png";  

const GridColumn = ({ name }) => {
    const renderIcons = () => {
        if (name === "Koynz" || name === "Start date") {
            return (
                <React.Fragment>
                    <img src={Uparrow} alt={`${name} Up Icon`} style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
                    <img src={Uparrow} alt={`${name} Down Icon`} style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
                </React.Fragment>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="listHeadings">
            <h4>{name} {renderIcons()}</h4>
        </div>
    );
};

export default GridColumn;
