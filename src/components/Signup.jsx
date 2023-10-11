import React from "react";

const Signup = () => {
  const handleFormSubmit = () => {
    return;
  };

  return (
    <div className="signup-box">
      <h1>Sign Up!</h1>
      <form className="submit-form" onSubmit={handleFormSubmit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <select name="Coding Language" id="" className="profile-select">
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
        <select name="Focus" id="" className="profile-select">
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
        <select name="Skill" id="" className="profile-select">
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
