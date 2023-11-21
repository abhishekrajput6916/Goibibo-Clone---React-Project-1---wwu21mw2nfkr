import axios from 'axios'
import React, { useEffect } from 'react'

function Hotels() {
  async function getHotelDetails(location) {
    try{
      const config = {
          headers: {
              projectID: "wwu21mw2nfkr"
          }
      }
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}`, config)
      console.log("response",response);
    }catch(err){
      console.log("err",err)
    }

   
  };
useEffect(()=>{
  getHotelDetails("bangalore");
},[])

  return (
    <div>Hotels</div>
  )
}

export default Hotels