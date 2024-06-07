import { AppBar, Box } from '@mui/material';
import React from 'react'

export default function TopBar({children}) {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          p:".5rem",
          backgroundColor: "primary.main",
        }}
          className="AppBar"
      >
        {children}
        
      </AppBar>
    </Box>
  );
}
