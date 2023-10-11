/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { jestDom } from "jest-environment-jsdom";

import Matches from "../src/components/Matches";
import "@testing-library/jest-dom";

import signupReducer, {
  setUsername,
  setPassword,
  setAuthenticated,
  setLang,
  setFocus,
  setSkill,
} from "../src/reduxSlices/signupSlice.js";

describe("Matches rendering?", () => {
  let matches;

  beforeAll(() => {
    matches = render(<Matches />);
  });

  test("Renders matches component", () => {
    const matchesHeader = matches.getByText("Matches");
    expect(matchesHeader).toBeInTheDocument();
  });
});

describe("Signup reducer", () => {
  let state;

  beforeEach(() => {
    state = {
      username: "",
      password: "",
      lang: [],
      focus: "",
      skill: "",
      isAuthenticated: false,
    };
  });

  describe("setUsername", () => {
    it("should update the username in state", () => {
      const initialState = state;
      const action = setUsername("TestUsername");
      const newState = { ...state, username: "TestUsername" };
      expect(signupReducer(initialState, action)).toEqual(newState);
    });

    it("should add language to lang array", () => {
      const initialState = { ...state, lang: ["Python", "C++"] };
      const action = setLang("JavaScript");
      const newState = { ...state, lang: ["Python", "C++", "JavaScript"] };
      expect(signupReducer(initialState, action)).toEqual(newState);
    });
  });
});
