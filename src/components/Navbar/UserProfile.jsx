import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function UserProfile({ name }) {
  const navigate=useNavigate();
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="profile-btn nav-link" onClick={()=>setShowModal((oldState)=>!oldState)}>
      <FontAwesomeIcon className="icon" icon={faUser} />
      <div className="profile-info-btn" onClick={()=>{navigate("/login")}}>{name ? `Hey ${name}` : "Login / Signup"}</div>
    </div>
  );
}

export default UserProfile;
