import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setPassword,
  setAuthenticated,
  setLang,
  setFocus,
  setSkill,
} from "../reduxSlices/signupSlice.js";
import { Navigate } from "react-router-dom";

const Signup = () => {
  // react hook for signup slice
  //   const { username } = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  // function to handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // send profile information in body of request
      const body = {
        username: e.target[0].value,
        password: e.target[1].value,
        lang: [e.target[2].value],
        focus: e.target[3].value,
        skill: e.target[4].value,
      };
      console.log("body:", body);
      // send post request to /signup
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(body),
      });
      // parse result into json and save as the current user
      const user = await response.json();
      // if response was successful update state with all profile
      if (response.status === 200) {
        dispatch(setUsername(user.username));
        dispatch(setAuthenticated(true));
        dispatch(setLang(user.lang[0])); // currently only works with one language
        dispatch(setFocus(user.focus));
        dispatch(setSkill(user.skill));
      }
    } catch (err) {
      console.log("ERROR on form submit: ", err);
    }
  };

  return (
    <div className="signup-box">
      <h1>Sign Up!</h1>
      <form className="submit-form" onSubmit={handleFormSubmit}>
        <label for="username">Username:</label>
        <input type="text" name="username" placeholder="Username" />
        <label for="password">Password:</label>
        <input type="password" name="password" placeholder="Password" />
        <label for="lang">Practice Languages:</label>
        <select name="lang" className="profile-select">
          <option value="JavaScript" className="profile-option">
            JavaScript
          </option>
          <option value="Java" className="profile-option">
            Java
          </option>
          <option value="Python" className="profile-option">
            Python
          </option>
          <option value="C++" className="profile-option">
            C++
          </option>
          <option value="TypeScript" className="profile-option">
            TypeScript
          </option>
          <option value="PHP" className="profile-option">
            PHP
          </option>
        </select>
        <label for="focus">Focus:</label>
        <select name="focus" className="profile-select">
          <option value="Frontend" className="profile-select">
            Frontend
          </option>
          <option value="Backend" className="profile-select">
            Backend
          </option>
          <option
            value="Data Structures & Algorithms"
            className="profile-option"
          >
            Data Structures & Algorithms
          </option>
        </select>
        <label for="skill">Skill Level:</label>
        <select name="skill" className="profile-select">
          <option value="Beginner" className="profile-select">
            Beginner
          </option>
          <option value="Intermediate" className="profile-select">
            Intermediate
          </option>
          <option value="Advanced" className="profile-option">
            Advanced
          </option>
          <option value="Coding Wizard" className="profile-select">
            Coding Wizard
          </option>
        </select>
        <button id="login" className="primary" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
