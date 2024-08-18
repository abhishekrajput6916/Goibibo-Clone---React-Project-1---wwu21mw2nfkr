import React, { useEffect } from "react";
import "./otherStyles.css";
import { Divider } from "@mui/material";

function Suggest({ array = [], handleClick, value = "", setSuggest }) {
  // useEffect(()=>{
  //   console.log("ST&Q " + searchTerm, query);
  // },[]);
  return (
    <div className="suggestion-box">
      {array
        .filter((item) => {
          const searchTerm = item.toLowerCase();
          const query = value.toLowerCase();
          // console.log("s " + searchTerm+" q", query);
          if (searchTerm.split("-")[0].trim() === query || searchTerm.split("-")[1].trim() === query) {
            setSuggest(false);
          }
          return query && searchTerm.includes(query) && searchTerm !== query;
        })
        .map((item) => {
          return (
            <div
              onClick={() => {
                handleClick(item.split("-")[1].trim());
                //   handleSearch(item.cityState);
                // console.log();
              }}
              key={item}
              className="dropdown-row"
            >
              {item}
              <Divider />
            </div>
          );
        })}
    </div>
  );
}

export default Suggest;
