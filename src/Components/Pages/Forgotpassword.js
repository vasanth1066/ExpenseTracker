import React, { useRef } from "react";
import MainHeader from "../Header/MainHeader";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const emailinputref = useRef();
  const navigate = useNavigate();
  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate("/SignIn");
  };
  const submitHandler = (event) => {
    const useremail = emailinputref.current.value;

    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7DSTo_2-kms1kJYEyWucRdwmYUTmNZHo",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: useremail,
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
        console.log("forgotpassword page---", data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <>
      <MainHeader />
      <div
        className="container"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundSize: "cover",
          backgroundImage:
            "url('https://img.freepik.com/free-vector/white-wave-white-background-with-blue-lines_483537-4174.jpg')",
        }}
      >
        <h2>Forgot Password</h2>
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

          <br />

          <button type="submit" className="  btn btn-secondary">
            Submit
          </button>
        </form>
        <br />
        <br />

        <button onClick={handleLoginClick} className="  btn btn-success ">
          Go to login
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
