import React from "react";
import { useEffect, useRef, useState } from "react";

import { Button, Grid, Typography } from "@mui/material";
import {
  Dialog,
} from "@mui/material";
import Counter from "../otherUtilityComponents/Counter";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'max-content',
  bgcolor: 'background.paper',
  border: "none",
  borderRadius:"1rem",
  boxShadow: 24,
  p: 4,
};

function FlightModal(props) {
    const { onClose, passengerDetails, open } = props;
    const [details, setDetails] = useState({
      adults: passengerDetails.adults,
      children: passengerDetails.children,
      infant: passengerDetails.infant,
    });

    const handleClose = () => {
      onClose(details);
    };
// function setDetails(){

// }
    const handleDoneBtnClick = () => {
      onClose(details);
    };

    return (
      <Dialog onClose={handleClose} open={open} PaperProps={{
        sx:style
      }} >
        
        <Typography id="modal-modal-title" variant="h5" component="h2">
        Travellers & Class
        </Typography>
        <Grid container spacing={2} id="modal-modal-description" display="flex" sx={{ mt: 2 }}>
            <Grid item xs={4} display="flex" flexDirection="column" className="guest-parent" id="adults">
              <Typography variant="h6">Adults</Typography>
              <Counter
                lowerBound={1}
                upperBound={16}
                doSet={(num) => {
                  setDetails((oldState) => {
                    return {
                      ...oldState,
                      adults: num,
                    };
                  });
                }}
              />
            </Grid>
            <Grid item xs={4} display="flex" flexDirection="column" className="guest-parent" id="children">
              <Typography variant="h6">Children</Typography>
              <Counter
                lowerBound={0}
                upperBound={4}
                doSet={(num) => {
                  setDetails((oldState) => {
                    return {
                      ...oldState,
                      children: num,
                    };
                  });
                }}
              />
            </Grid>
            <Grid item xs={4} display="flex" flexDirection="column" lassName="guest-parent" id="rooms">
              <Typography variant="h6">Infants</Typography>
              <Counter
                lowerBound={0}
                upperBound={8}
                doSet={(num) => {
                  setDetails((oldState) => {
                    return {
                      ...oldState,
                      infant: num,
                    };
                  });
                }}
              />
            </Grid>
        </Grid>
          <Button lg variant="contained" onClick={handleDoneBtnClick} sx={{mt:"2rem",borderRadius:"1rem"}}>
            Done
          </Button>

      </Dialog>
    );
  };
// FlightModal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   passengerDetails: PropTypes.string.isRequired,
// };

export default FlightModal;
