import React from "react";
import { Link } from "react-router-dom";
import { setAuthenticated } from "../reduxSlices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  // const { isAuthenticated } = useSelector((state) => state.user)
  // function for signing out
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(setAuthenticated(false));
  };

  return (
    <nav className="nav-bar">
      <li className="nav-link">
        <Link to="/myProfile">
          <button className="nav-btn">Profile</button>
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/">
          <button className="nav-btn" onClick={handleSignout}>
            Sign Out
          </button>
        </Link>
      </li>
    </nav>
  );
};

export default Navbar;
