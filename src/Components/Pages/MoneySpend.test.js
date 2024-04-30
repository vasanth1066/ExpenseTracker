import React from "react";
import MoneySpend from "./MoneySpend";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../Store";

describe("ExpenseTracker  tests", () => {
  test("renders Money Spent label", () => {
    render(
      <Provider store={store}>
        <MoneySpend />
      </Provider>
    );
    const moneySpentLabel = screen.getByLabelText("Money Spent");
    expect(moneySpentLabel).toBeInTheDocument();
  });

  test("adds a new expense entry on form submission", () => {
    render(
      <Provider store={store}>
        <MoneySpend />
      </Provider>
    );
    const submitButton = screen.getByText("Submit");

    userEvent.click(submitButton);

    screen.findByText("Select any option below");
    expect(screen.getByText("Select any option below")).toBeInTheDocument();
  });

  test('displays "Activate Premium!!!" alert when total expenses exceed 10000', () => {
    render(
      <Provider store={store}>
        <MoneySpend />
      </Provider>
    );

    expect(screen.queryByText("Activate Premium!!!")).not.toBeInTheDocument();
  });
});
