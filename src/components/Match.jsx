import React from "react";

const Match = ({ username, lang, focus, skill }) => {
  return (
    <div className="match-box">
      <p>Name: {username}</p>
      <p>Language: {lang[0]}</p>
      <p>Focus: {focus}</p>
      <p>Skill: {skill}</p>
      <Link to={`/userProfile/${username}`}>
        <button className="see-profile">See Profile</button>
      </Link>
    </div>
  );
};
export default Match;
