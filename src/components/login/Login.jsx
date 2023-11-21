import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './login.css';
import Modal from '../modal/Modal';

function Login() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const navigate=useNavigate();
  const signupRef=useRef();
    const [userDetails,setUserDetails]=useState({
        email:'',
        password:'',
    });

    function handleFormSubmit(e){
      e.preventDefault();
      const userList=JSON.parse(localStorage.getItem("userList"));
      if(!userList){
          return;
      }
      const user=userList.find((usr)=>usr.email===userDetails.email);
      console.log("user: ",user);
      if(user){
          if(user.password===userDetails.password){
              console.log("Welcome",userDetails.fullName);
              setIsLoggedIn("true")
              navigate("/flights");
          }else{
              console.log("password is incorrect");
          }
      }else{
          console.log("no user found");
          // navigate("/signup");
          signupRef.current.focus();
      }
    }

  function handleInputChange(e){
    const {name,value}=e.target;
    setUserDetails({...userDetails,[name]:value});
} 
  
  return (
    <Modal>
      <h1 className='title'>Log In</h1>
      <input type="email" name="email" id="email" value={userDetails.email} onChange={handleInputChange} placeholder="Enter Email" />
      <input type="password" name="password"  id="password" value={userDetails.password} onChange={handleInputChange} placeholder="Enter Password" />
      <button onClick={handleFormSubmit} id="login-btn">Login</button>
      <div className='signup-path'>
        <p id="new-user">New User..?</p>
        <button className="signup-btn" ref={signupRef} onClick={()=>navigate("/signup")}>Sign Up</button>
    </div>
      
    </Modal>
  )
}

export default Login