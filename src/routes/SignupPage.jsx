import React from "react";
import Signup from "../components/Signup.jsx";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const SignupPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  // if user is authenticated, user has signed up, navigate to /matches
  // console.log("state,", state);
  console.log("isAuthenticated:", isAuthenticated);
  if (isAuthenticated) {
    return <Navigate replace to="/matches" />;
  }
  // otherwise, render the signup box
  else {
    return (
      <div className="login-box">
        <h1>.join</h1>
        <Signup />
      </div>
    );
  }
};

export default SignupPage;
