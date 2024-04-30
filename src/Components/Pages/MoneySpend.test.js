import MoneySpend from "./MoneySpend";

import { render, screen } from "@testing-library/react";

test("renders Sign In text", () => {
  render(<MoneySpend />);
  const linkElement = screen.getByText("Money Spent");
  expect(linkElement).toBeInTheDocument();
});
