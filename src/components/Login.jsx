import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  setUsername,
  setPassword,
  setAuthenticated,
} from "../reduxSlices/userSlice";

//Does not function, should render fields for username and password
//needs to have route sent to /preferences.jsx if authenticared = true;

const Login = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    //const loginEndpoint = "http://localhost:3000/login";
    const body = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.status === 401) {
        dispatch(setAuthenticated(false));
        alert("Authentication failed.");
      } else if (response.ok) {
        dispatch(setAuthenticated(true));
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="Login-container">
      <form className="submit-form" onSubmit={handleFormSubmit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button id="login" className="primary" type="submit">
          Log in to find your pair programming partner!
        </button>
      </form>
      <Link to="/signup">
        <button className="signup-btn">Sign Up!</button>
      </Link>
    </div>
  );
};
export default Login;
