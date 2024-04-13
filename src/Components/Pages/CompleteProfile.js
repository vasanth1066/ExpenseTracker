import React, { useRef } from "react";
const Completeprofile = () => {
  const FullNameinputref = useRef();
  const ProfileURLinputRef = useRef();

  const SubmitHandler = (event) => {
    event.preventDefault();
    const userFullname = FullNameinputref.current.value;
    const userprofileurl = ProfileURLinputRef.current.value;

    // console.log(userFullname, userprofileurl);
    const token = localStorage.getItem("token");

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
          top: "30%",
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
              ref={FullNameinputref}
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
              ref={ProfileURLinputRef}
              required
            />
          </div>

          <button type="submit" class="btn btn-info">
            Update
          </button>
        </form>
      </div>
    </>
  );
};
export default Completeprofile;
