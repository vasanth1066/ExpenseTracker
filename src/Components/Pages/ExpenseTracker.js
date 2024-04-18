import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExpenseTracker = () => {
  const [data, setData] = useState([]);
  const moneyinputref = useRef();
  const Descriptioninputref = useRef();
  const Categoryinputref = useRef();
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

  const moneyspenthandler = (event) => {
    event.preventDefault();
    const usermoney = moneyinputref.current.value;
    const userdescription = Descriptioninputref.current.value;
    const usercategory = Categoryinputref.current.value;

    setData([...data, { usermoney, userdescription, usercategory }]);
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
      <div className="container-xl d-flex justify-content-center align-items-center">
        <form onSubmit={moneyspenthandler}>
          <div class="mb-7 ">
            <label for="MoneySpent" class="form-label">
              Money Spent
            </label>
            <input
              type="number"
              class="form-control"
              id="MoneySpent"
              ref={moneyinputref}
            />
          </div>
          <div class="mb-7 ">
            <label for="Description" class="form-label">
              Description
            </label>
            <input
              type="text"
              class="form-control"
              id="Description"
              ref={Descriptioninputref}
            />
          </div>
          <div class="mb-7 ">
            <label for="Category" class="form-label">
              Category
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              ref={Categoryinputref}
            >
              <option selected>Select any option below</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Movie">Movie</option>
              <option value="Salary">Salary</option>
            </select>
          </div>
          <br />

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div className="container-xxl d-flex justify-content-left align-items-center">
        {console.log("data", data)}
        <div>
          {data.map((val, index) => (
            <ul key={index} class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center ">
                <span class="list-group-item list-group-item-action list-group-item-success">
                  Description:{val.userdescription}
                </span>
                <div style={{ marginRight: "10px" }}></div>

                <span class="list-group-item list-group-item-action list-group-item-info">
                  Category: {val.usercategory}
                </span>
                <span class="badge bg-dark rounded-pill">
                  Money Spent: {val.usermoney}
                </span>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};
export default ExpenseTracker;
