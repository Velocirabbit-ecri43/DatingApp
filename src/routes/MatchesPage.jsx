import React from "react";
import MatchesContainer from "../containers/MatchesContainer.jsx";
import { useDispatch } from "react-redux";
import { updateMatches } from "../reduxSlices/matchesSlice.js";
import Navbar from "../components/Navbar.jsx";

const MatchesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/matches/${username}`)
      .then((res) => res.json())
      .then((data) => dispatch(updateMatches(data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="matches">
      <Navbar />
      <h1>.join Matches</h1>
      <MatchesContainer />
    </div>
  );
};

export default MatchesPage;
