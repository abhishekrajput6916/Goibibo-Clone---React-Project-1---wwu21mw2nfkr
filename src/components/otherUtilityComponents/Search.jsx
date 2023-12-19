import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function Search({ handleSearch, searchFor, array }) {
  const [value, setValue] = useState('');
  const [suggest, setSuggest] = useState(true);
  // const [filteredArray, setFilteredArray] = useState([]);
  function onChange(e) {
    setValue(e.target.value);
    // setSuggest(false)
    handleSearch(value);
  }
  useEffect(()=>{setSuggest(true)},[value])
  
  return (
    <div className="search-component">
      <FaSearch className="search-icon" />
      <input
        type="text"
        onChange={onChange}
        placeholder={`Enter ${searchFor}`}
        value={value}
      />

      {value && suggest && <div id="matchingResults" className="dropdown">
        {array
          .filter((item) => {
            const searchTerm = item.location.toLowerCase();
            const query = value.toLowerCase();
            if(searchTerm===query){
              setSuggest(false)
            }
            return query && searchTerm.includes(query) && searchTerm!==query;
          })
          .map((item) => {
            return (
              <div
                onClick={() => {
                  setValue(item.location)
                  handleSearch(item.location);
                  // console.log();
                }}
                key={item._id}
                className="dropdown-row"
              >
                {item.location}
                
              </div>
            );
          })}
      </div>}
    </div>
  );
}

export default Search;
