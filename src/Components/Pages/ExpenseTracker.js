import React from "react";
import { useNavigate } from "react-router-dom";
import MoneySpend from "./MoneySpend";

const ExpenseTracker = () => {
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

  return (
    <>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <h4> Welcome to Expense Tracker</h4>

            <ul class="nav justify-content-end">
              <span class="navbar-text">Your profile is Incomplete</span>
              <li class="nav-item">
                <a class="nav-link" href="/Completeprofile">
                  Link
                </a>
              </li>
              <button
                type="button"
                class="btn btn-danger"
                onClick={Logouthandler}
              >
                Logout
              </button>
            </ul>
          </div>
        </nav>
      </div>
      <div>
        <br />
        <button type="submit" class="btn btn-secondary" onClick={verifymailid}>
          Verify Email
        </button>
      </div>
      <MoneySpend />
    </>
  );
};
export default ExpenseTracker;
