import { Typography } from '@mui/material'
import React from 'react'
 
 function SideBar({children}) {
   return (
     <div>
      <Typography variant='h5'>Filters</Typography>
      {children}
     </div>
   )
 }
 
 export default SideBar