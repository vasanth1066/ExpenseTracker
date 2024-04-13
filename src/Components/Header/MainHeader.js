import React from "react";

function MainHeader() {
  return (
    <div>
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="#">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Products
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            About Us
          </a>
        </li>
      </ul>
    </div>
  );
}

export default MainHeader;
