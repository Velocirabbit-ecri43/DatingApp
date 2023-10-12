import React from "react";
import { Link } from "react-router-dom";

const Match = ({ username, skill, focus }) => {
  return (
    <div className="match-box">
      <p>Name: {username}</p>
      <p>Language: {"JavaScript"}</p>
      <p>Focus: {focus}</p>
      <p>Skill: {skill}</p>
      <Link to={`/userProfile/${username}`}>
        <button className="see-profile">See Profile</button>
      </Link>
    </div>
  );
};
export default Match;
