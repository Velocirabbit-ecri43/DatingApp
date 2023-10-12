import React from "react";
import MatchesContainer from "../containers/MatchesContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateMatches } from "../reduxSlices/matchesSlice.js";
import Navbar from "../components/Navbar.jsx";
import { useEffect } from "react";

const MatchesPage = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);
  console.log("username in matchespage", username);

  useEffect(() => {
    // fetch(`/matches/${username}`)
    //   .then((res) => res.json())
    //   .then((res) => console.log("res", res))
    //   .then((data) => dispatch(updateMatches(data)))
    //   .then((data) => console.log("dispatched!"))
    //   .catch((err) => console.log(err));

    const fetchMatches = async () => {
      const response = await fetch(`/matches/${username}`);
      const res = await response.json();
      dispatch(updateMatches(res));
    };
    fetchMatches().catch(console.error);
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
