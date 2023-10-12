import React from "react";

const Match = ({ username, lang, focus, skill }) => {
  return (
    <div className="match-box">
      <p>Name: username</p>
      <p>Language: {lang[0]}</p>
      <a id="connect" href="http://localhost:8080/connect">
        Connect with Me!
      </a>
    </div>
  );
};
export default Match;
