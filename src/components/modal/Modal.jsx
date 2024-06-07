import React, { useContext, useEffect, useRef } from "react";
import "./modal.css";
import { createPortal } from "react-dom";
import { LoginContext ,useAuth,useModal} from "../Contexts/contexts";
import SignIn from "../login/SignIn";
import ProfileCard from "../login/Logout";
// import SignInSide from "../login/LogIn2";
import { Modal,Box, Typography} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30rem",
  bgcolor: 'background.paper',
  border: "none",
  borderRadius:"1rem",
  boxShadow: 24,
  p: 4,
};

const LoginModal = () => {
  const { showModal,setShowModal } = useModal();
  const { isLoggedIn,setIsLoggedIn } = useAuth();                 

  const ref = useRef();
  useEffect(() => {
    // console.log("Modal Open");
    const checkIfClickedOutside = (e) => {
      // console.log("ref",ref.current);
      if (showModal && e.target.contains(ref.current)) {
        // console.log("setting showModal false");
        setShowModal(false);
      }
    };    
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      // console.log("modal close");
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);

  return (
    <Modal 
      open={showModal}
      onClose={()=>setShowModal(false)}
      ref={ref}>
      {/* <Typography>Hello from Modal</Typography> */}
      <Box sx={style}>
        <CloseRounded onClick={()=>{
            // console.log("modal close");
            setShowModal(false);
          }} className="xmark"/>
        <Box >
          {isLoggedIn ? <ProfileCard /> : <SignIn/>}
        </Box>   
      </Box>
    </Modal>
  );
};


export default LoginModal;
