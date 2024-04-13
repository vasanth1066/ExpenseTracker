import React, { useState } from "react";
const Completeprofile = () => {
  const [userFullname, setUserFullname] = useState("");
  const [userprofileurl, setUserprofileurl] = useState("");

  const SubmitHandler = (event) => {
    event.preventDefault();

    // console.log(userFullname, userprofileurl);
    const token = localStorage.getItem("token");
    console.log("token", token);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB7DSTo_2-kms1kJYEyWucRdwmYUTmNZHo",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: userFullname,
          photoUrl: userprofileurl,
          deleteAttribute: null,
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
        console.log("Complete profile page---", data);
      })
      .catch((err) => {
        alert(err.message);
      });
    setUserFullname("");
    setUserprofileurl("");
  };

  const getdataformdatabase = (event) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB7DSTo_2-kms1kJYEyWucRdwmYUTmNZHo",
      {
        method: "POST",
        body: JSON.stringify({
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
        console.log("get data profile page---", data);

        data.users.map((val) => {
          setUserFullname(val.displayName);
          setUserprofileurl(val.photoUrl);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <h4> Winner never quite, Quitters never win.</h4>

            <ul class="nav justify-content-end">
              <span class="navbar-text">
                Your Profile is 64% completed. A complete Profile has higher
                chance of landing a job.
              </span>

              <li class="nav-item">
                <a class="nav-link" href="">
                  Complete now
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div
        className="container-xl"
        style={{
          position: "fixed",
          top: "50%",
          left: "100%",
          transform: "translate(-50%, -50%)",
          backgroundSize: "cover",
        }}
      >
        <form onSubmit={SubmitHandler}>
          <h3> Contact Details</h3>
          <div class="mb-2 col-4">
            <img
              src="https://www.svgrepo.com/show/475654/github-color.svg"
              alt=""
              width="30"
              height="24"
            />
            Full Name
            <input
              value={userFullname}
              onChange={(e) => setUserFullname(e.target.value)}
              type="text"
              class="form-control"
              id="FullName"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div class="mb-2 col-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Blue_globe_icon.svg/1200px-Blue_globe_icon.svg.png"
              alt=""
              width="30"
              height="24"
            />
            Profile Photo URL
            <input
              type="text"
              class="form-control"
              value={userprofileurl}
              onChange={(e) => setUserprofileurl(e.target.value)}
              required
            />
          </div>

          <button type="submit" class="btn btn-info">
            Update
          </button>
        </form>
        <br />
        <button
          type="submit"
          class="btn btn-secondary"
          onClick={getdataformdatabase}
        >
          Get data form database
        </button>
      </div>
    </>
  );
};
export default Completeprofile;
