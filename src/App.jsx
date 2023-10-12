import React from "react";
import LoginPage from "./routes/LoginPage.jsx";
import SignupPage from "./routes/SignupPage.jsx";
import MatchesPage from "./routes/MatchesPage.jsx";
import OtherProfilePage from "./routes/OtherProfilePage.jsx";
import MyProfilePage from "./routes/MyProfilePage.jsx";
import "./styles.scss";
import ReactDOM from "react-dom";
import { loginStore } from "./reduxStores/loginStore.js";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    // react routes for each page
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/matches" element={<MatchesPage />} />
      <Route path="/userProfile/:username" element={<OtherProfilePage />} />
      <Route path="/myProfile" element={<MyProfilePage />} />
    </Routes>
  );
};

//store={loginStore}

export default App;
