import React, { useRef } from "react";
import MainHeader from "../Header/MainHeader";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const emailinputref = useRef();
  const passwordinputref = useRef();
  const Navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const useremail = emailinputref.current.value;
    const userpassword = passwordinputref.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7DSTo_2-kms1kJYEyWucRdwmYUTmNZHo",
      {
        method: "POST",
        body: JSON.stringify({
          email: useremail,
          password: userpassword,
          returnSecureToken: true,
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
        console.log("Logged in", data);
        Navigate("/ExpenseTracker");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleLoginClick = () => {
    Navigate("/Login");
  };
  return (
    <div>
      <MainHeader />
      <div
        className="container-xl"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundSize: "cover",
        }}
      >
        <h2>SignIn</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-7 col-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              ref={emailinputref}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-7 col-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              ref={passwordinputref}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <br />

          <button type="submit" className="  btn btn-primary">
            Login
          </button>
        </form>

        <span className=" mb-7 col-4  ">Create an Account </span>
        <button onClick={handleLoginClick} className="  btn btn-secondary ">
          Go to Signup
        </button>
      </div>
    </div>
  );
};
export default SignIn;
