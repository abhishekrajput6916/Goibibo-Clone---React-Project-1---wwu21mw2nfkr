import { useEffect, useRef, useState } from "react";
import React from "react";
import "./hotels.css";
import Counter from "../otherUtilityComponents/Counter";
import { Button, Box, Grid, Modal, Typography } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: "none",
  borderRadius:"1rem",
  boxShadow: 24,
  p: 4,
};

function HotelModal({ onClose, setGuests, setRooms }) {
  //to create a portal, use the createPortal function:
  const [details, setDetails] = useState({
    rooms: 1,
    adults: 1,
    children: 0,
  });
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (e.target.contains(ref.current)) {
        onClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);
  useEffect(() => {}, [details.rooms, details.children, details.adults]);
  function handleDoneBtnClick() {
    setGuests(details.adults, details.children);
    setRooms(details.rooms);
    onClose();
  }

  return (
    <Modal
    ref={ref}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Guest & Rooms
        </Typography>
        <Grid container spacing={2} id="modal-modal-description" display="flex" sx={{ mt: 2 }}>
            <Grid item xs={4} display="flex" flexDirection="column" lassName="guest-parent" id="rooms">
              <Typography variant="h6">Rooms (max 8)</Typography>
              <Counter
                lowerBound={1}
                upperBound={8}
                doSet={(num) => {
                  setDetails((oldState) => {
                    return {
                      ...oldState,
                      rooms: num,
                    };
                  });
                }}
              />
            </Grid>
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
        </Grid>
          <Button lg variant="contained" onClick={handleDoneBtnClick} sx={{mt:"2rem",borderRadius:"1rem"}}>
            Done
          </Button>
      </Box>
    </Modal>);
}

export default HotelModal;
