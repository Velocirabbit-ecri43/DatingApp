import { render, screen } from "@testing-library/react";

import Matches from "../src/components/Matches";
import { beforeEach } from "node:test";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

describe('Matches rendering?', () => {
  beforeEach(async () => {
    const matches = await render(
      <Matches />
    )
  })

  test('Renders matches component', () => {
    const matchesHeader = screen.queryByText('Matches');
    expect(matchesHeader).toBeInTheDocument();
  })
})