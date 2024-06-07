import { faL } from "@fortawesome/free-solid-svg-icons";
import { SearchRounded } from "@mui/icons-material";
import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function Search({ handleSearch, searchFor, array,sx,color,InputProps }) {
  const [value, setValue] = useState('');
  const [suggest, setSuggest] = useState(true);
  function onChange(e) {
    setValue(e.target.value);
    handleSearch(value);
  }
  useEffect(()=>{setSuggest(true)},[value])
  
  return (
    <div className="search-component">
      <SearchRounded color={color}/>
      <Input
      sx={sx}
        type="text"
        onChange={onChange}
        placeholder={`Enter ${searchFor}`}
        value={value}
        InputProps={InputProps}
      />

      {value && suggest && <div id="matchingResults" className="dropdown">
        {array
          .filter((item) => {
            const searchTerm = item.cityState.toLowerCase();
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
                  setValue(item.cityState)
                  handleSearch(item.cityState);
                  // console.log();
                }}
                key={item._id}
                className="dropdown-row"
              >
                {item.cityState}
                
              </div>
            );
          })}
      </div>}
    </div>
  );
}

export default Search;
