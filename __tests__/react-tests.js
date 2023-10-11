/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { jestDom } from 'jest-environment-jsdom';

import Matches from "../src/components/Matches";
import '@testing-library/jest-dom';


describe('Matches rendering?', () => {
  let matches;
  
  beforeAll(() => {
    matches = render(
      <Matches />
    )
  })

  test('Renders matches component', () => {
    const matchesHeader = matches.getByText('Matches');
    expect(matchesHeader).toBeInTheDocument();
  })
})