import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { LoginContext } from '../Contexts/contexts';
import Login from '../login/Login';

function HotelSearchInterface() {
  const location=useLocation();
  const {isLoggedIn}=useContext(LoginContext);

  const [filteredHotels,setFilteredHotels]=useState([]);
  useEffect(() => {
    console.log(location.state.data);
    console.log(location.state.hotels);
    setFilteredHotels(()=>{
      const {hotels}=location.state;
      const {data}=location.state;
      return hotels.filter((hotel)=>{ return hotel.location.toLowerCase().includes(data.city.toLowerCase())})
    })
    // console.log(filteredHotels);
  }, []);
  useEffect(()=>console.log(filteredHotels),[filteredHotels])
  return (
    isLoggedIn &&
    <div id='hotel-search-result'>
      {filteredHotels.map((hotel)=>{
        return <div className="hotel-name">{hotel.name}</div>
      })} 
    </div>
  )
}

export default HotelSearchInterface
