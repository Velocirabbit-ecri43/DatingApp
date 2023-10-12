// get request to /matches/:username
// responds with an array of match objects
// iterate through the array, and render a Match component for each object and push to an array
//  return <div wvefber /> {matchArray} <div/>
import React from "react";
import { useSelector } from "react-redux";
import Match from "../components/Match.jsx";

const MatchesContainer = () => {
  //   const [matches, setMatches] = useState([]);

  const { matches } = useSelector((state) => state.matches);
  console.log("matches:", matches);
  const matchesToDisplay = [];
  let i = 0;
  for (let match of matches) {
    console.log("match: ", match);
    matchesToDisplay.push(
      <Match
        username={match.username}
        focus={match.focus}
        skill={match.skill}
        key={i}
      />
    );
    i++;
  }

  return <div className="matches-container">{matchesToDisplay}</div>;
};

export default MatchesContainer;
