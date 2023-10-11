// get request to /matches/:username
// responds with an array of match objects
// iterate through the array, and render a Match component for each object and push to an array
//  return <div wvefber /> {matchArray} <div/>
import React from "react";

const MatchContainer = ({ username }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`/maches/${username}`)
      .then((res) => res.json())
      .then((data) => setMatches(data));
  }),
    [username];
  return (
    <div>
      <h1>Interests In Common</h1>
      <p>Match Name: {data.name}</p>
      <p>Matching Interests</p>
      <ul></ul>
    </div>
  );
};
