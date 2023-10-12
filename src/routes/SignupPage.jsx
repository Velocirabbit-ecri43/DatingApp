import React from "react";
import Signup from "../components/Signup.jsx";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const SignupPage = () => {
  const { isAuthenticated } = useSelector((state) => state.signup);
  // if user is authenticated, user has signed up, navigate to /matches
  if (isAuthenticated) {
    return <Navigate repalce to="/matches" />;
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
