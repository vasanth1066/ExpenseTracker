import React from "react";
import { useNavigate } from "react-router-dom";
import MoneySpend from "./MoneySpend";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../Store/themeReducer";

const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const showdata = useSelector((state) => state.expense.data);
  console.log("getdataform store", showdata);

  const verifymailid = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    console.log("token", token);
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7DSTo_2-kms1kJYEyWucRdwmYUTmNZHo",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }

            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        console.log("verifymail page---", data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const navigate = useNavigate();
  const Logouthandler = (event) => {
    event.preventDefault();
    navigate("/SignIn");
    localStorage.removeItem("token");
  };

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
    >
      <div>
        <nav
          className={`navbar navbar-expand-lg ${
            isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
          }`}
        >
          <div className="container-fluid">
            <h4> Welcome to Expense Tracker</h4>

            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </label>
            </div>

            <ul className="nav justify-content-end">
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={verifymailid}
              >
                Verify Email
              </button>
              <div style={{ marginRight: "10px" }}></div>

              <span className="navbar-text">Your profile is Incomplete</span>
              <li className="nav-item">
                <a className="nav-link" href="/Completeprofile">
                  Link
                </a>
              </li>
              <button
                type="button"
                className="btn btn-danger"
                onClick={Logouthandler}
              >
                Logout
              </button>
            </ul>
          </div>
        </nav>
      </div>
      <div></div>
      <MoneySpend isDarkMode={isDarkMode} />
    </div>
  );
};
export default ExpenseTracker;
