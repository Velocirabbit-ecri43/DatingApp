// get request to /matches/:username
// responds with an array of match objects
// iterate through the array, and render a Match component for each object and push to an array
//  return <div wvefber /> {matchArray} <div/>
import React from "react";

const MatchesContainer = () => {
  //   const [matches, setMatches] = useState([]);

  const { matches } = useSelector((state) => state.matches);

  const matchesToDisplay = [];
  let i = 0;
  for (let match of matches) {
    matchesToDisplay.push(
      <Match
        username={match.username}
        lang={match.lang}
        focus={match.focus}
        skill={match.skill}
      />
    );
    i++;
  }

  return <div className="matches-container">{matchesToDisplay}</div>;
};

export default MatchesContainer;
