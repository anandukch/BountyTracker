import React, { useState } from "react";
import SearchIcon from "../../assets/iconsearch.svg";
import "../../pages/TaskList/taskList.scss";
import"../../components/Search/search.scss";
 
 const Search = () => {
  const [searchText, setSearchText] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

return(
<div className="searchBar">
       
       <img className="search-icon" src={SearchIcon}  />
       
       <input type="text"   placeholder="Search"  value={searchText} onChange={handleInputChange} className="search-input" />
    </div>
)
 };
export default Search;
 
       

    
