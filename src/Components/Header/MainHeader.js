import React from "react";

function MainHeader() {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/021/599/588/small/abstract-white-and-gray-overlap-circles-background-3d-paper-circle-banner-with-drop-shadows-minimal-simple-design-for-presentation-flyer-brochure-website-book-etc-vector.jpg')",
      }}
    >
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
