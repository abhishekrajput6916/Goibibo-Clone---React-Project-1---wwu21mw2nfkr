import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();
  const initialData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userID: "",
  };
  const [userDetails, setUserDetails] = useState(initialData);
  function handleInputChange(e) {
    const { value, name } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }
  function handleSubmit(e) {
    const id = Math.floor(Math.random() * 10000);
    const data = { ...userDetails, id: id };
    e.preventDefault();
    console.log(data);
    const userList = JSON.parse(localStorage.getItem("userList"));
    if (userList) {
      if (userList.find((user) => user.email === data.email)) {
        console.log("user already exists.");
        navigate("/login")
        return;
      } else {
        userList.push(data);
        localStorage.setItem("userList", JSON.stringify(userList));
      }
    } else {
      const newUserList = [data];
      localStorage.setItem("userList", JSON.stringify(newUserList));
    }
    // localStorage.setItem("userList",)
    console.log("userList", userList);
    // navigate("/login");
  }
  return (
    <div className="form-container">
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
        onChange={handleInputChange}
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        value={userDetails.confirmPassword}
      />
      <button id="signup-btn" onClick={handleSubmit}>
        Signup
      </button>
      <div className="login-path">
        <p>Already a user..?</p>
        <button onClick={() => navigate("/login")}>Login Here</button>
      </div>
    </div>
  );
}

export default Signup;








