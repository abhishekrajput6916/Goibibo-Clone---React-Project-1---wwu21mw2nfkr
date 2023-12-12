import React, { useContext, useEffect, useRef } from "react";
import "./modal.css";
import { createPortal } from "react-dom";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Logout from "../login/Logout";
import { LoginContext } from "../Contexts/LoginContext";
import { ModalContext } from "../Contexts/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = () => {
  const {showModal,setShowModal}=useContext(ModalContext);

  const ref = useRef();
  useEffect(() => {
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
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const { isLoggedIn, setIsLoggedin } = useContext(LoginContext);                 
  // console.log("Modal Opened");

  return createPortal(
    <div className="modal" ref={ref}>
      <div className="modal-content">
        <FontAwesomeIcon onClick={()=>{
            // console.log("modal close");
            setShowModal(false);
          }} className="xmark" icon={faXmark} />
        {/* <div className="modal-banner">Banner</div> */}
        <div className="modal-body">{isLoggedIn ? <Logout /> : <Login/>}
        </div>
        
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};


export default Modal;
