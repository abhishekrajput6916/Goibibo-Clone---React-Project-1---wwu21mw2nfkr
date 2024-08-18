import React from 'react'
import { useEffect } from 'react'
import { useAuth, useFlightData } from '../Contexts/contexts'
import { useLocation } from 'react-router-dom';
import flightLogo from '../../images/flightLogo.png'

function FlightCheckOut() {
  const {flight}=useLocation().state.flightData;
  const {flightContext} =useFlightData();
    const {isLoggedIn}=useAuth();
    useEffect(() => {
      console.log(flightContext);
    }, [])
    
  return (
    <div className=''>
      <div className="h-56 w-screen bg-blue-500"></div>
      <div className="md:selection:w-10/12 w-11/12 mx-auto absolute right-0 left-0 top-24 z-10e">
      <h1 className="font-bold text-2xl text-white">Review your booking</h1>
      <div className='mt-4 flex gap-4 flex-wrap md:flex-nowrap'>
        <div className="first-block w-full md:w-10/12 shadow-md border py-6 rounded-lg bg-white">
          <div className="flights-name my-4 ">
            {/* <h1 className=' border-l-4 border-black pl-4 font-extrabold my-1 text-base md:text-xl'>{flightContext.source} - {flightContext.destination}</h1> */}
            <p className='px-5 text-sm md:text-base'>Non Stop </p>
          </div>
          <div className='border-gray-400  border rounded-lg p-2 md:p-6 mx-5 '>
            <div className="flex justify-between items-center">
              <div className="flex justify-center gap-1 overflow-hidden bg-no-repeat bg-center h-6 md:h-10  items-center">
                <img src={flightLogo} className='w-full h-full ' alt="Flight-logo" />
                <h1 className='text-nowrap  text-sm md:text-base'>Air India</h1>
              </div>
              <h1 className='uppercase text-xs md:text-sm'>Economy | <span className='font-bold'>Saver</span></h1>
            </div>
            <div className="flex justify-between items-center">
                {/* <h1 className='text-[12px] md:text-sm bg-blue-100 py-1 px-2 rounded-md'>Start on - {flightContext.departureDate}</h1> */}
              <h1 className='text-[12px] md:text-sm bg-blue-100 py-1 px-2 rounded-md'>Arrrive on - </h1>    
            </div>
            <div className="flex justify-between">
              
            </div>
          </div>
        </div>
        <div className="fare-summ bg-white w-4/12 rounded-lg shadow-md border p-6">fare summery</div>
      </div>
      </div>
    </div>
  )
}

export default FlightCheckOut