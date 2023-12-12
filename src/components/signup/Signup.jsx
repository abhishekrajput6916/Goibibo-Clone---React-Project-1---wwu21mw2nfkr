import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import Modal from "../modal/Modal";
function Signup({ setIsOldUser }) {
  const initialData = {
    fullName: "",
    email: "",
    password: "",
  };
  const [err, seterr] = useState("");
  const [cPass, setCPass] = useState("");
  const [userDetails, setUserDetails] = useState(initialData);
  function handleInputChange(e) {
    const { value, name } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }
  function handleSubmit(e) {
    const id = Math.floor(Math.random() * 10000);
    const data = { ...userDetails, userId: id };
    e.preventDefault();
    console.log(data);
    const userList = JSON.parse(localStorage.getItem("userList"));
    if (userList) {
      if (userList.find((user) => user.email === data.email)) {
        console.log("user already exists.");
        setIsOldUser();
        return;
      } else {
        if (data.fullName == "") {
          seterr("Enter full name");
        } else if (data.email == "") {
          seterr("Enter email");
        } else if (data.password == "") {
          seterr("Enter password");
        } else if (data.password !== cPass){
          seterr("Password mismatch!!")
        }else {
          userList.push(data);
          localStorage.setItem("userList", JSON.stringify(userList));
        }
      }
    } else {
      if (data.fullName == "") {
        seterr("Enter full name");
      } else if (data.email == "") {
        seterr("Enter email");
      } else if (data.password == "") {
        seterr("Enter password");
      } else if (data.password !== cPass){
        seterr("Password mismatch!!")
      }else {
        const newUserList = [data];
        localStorage.setItem("userList", JSON.stringify(newUserList));
      }
    }
    // localStorage.setItem("userList",)
    console.log("userList", userList);
    // navigate("/login");
  }
  return (
    <div className="signup-form">
      <h1 className="signup-page-title">Sign Up</h1>
      <input
        onChange={handleInputChange}
        type="text"
        name="fullName"
        value={userDetails.fullName.toUpperCase()}
        id="fullname"
        placeholder="Enter your Full Name"
      />
      <input
        onChange={handleInputChange}
        type="email"
        name="email"
        id="email"
        value={userDetails.email}
        placeholder="Enter Email"
      />
      <input
        onChange={handleInputChange}
        type="password"
        name="password"
        id="password"
        value={userDetails.password}
        placeholder="Create Password"
      />
      <input
        onChange={(e) => {
          setCPass(e.target.value);
        }}
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        value={cPass}
      />
      <button id="signup-btn" onClick={handleSubmit}>
        Signup
      </button>
      {err && <div className="error">Error: {err}</div>}
      <div className="login-path">
        <p>Already a user..?</p>
        <button
          onClick={() => {
            console.log("open login");
            setIsOldUser();
          }}
        >
          Login Here
        </button>
      </div>
    </div>
  );
}

export default Signup;
