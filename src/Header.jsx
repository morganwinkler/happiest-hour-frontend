/* eslint-disable react/prop-types */
// import { Link, useLocation } from "react-router-dom";
// import { Logout } from "./Logout";

export function Header() {
  let navLinks;
  if (localStorage.jwt === undefined) {
    navLinks = (
      <div>
        <a href="/"> Happiest Hour</a>
      </div>
    );
  } else {
    navLinks = (
      <div>
        <a href="/">My Profile</a>
        <a href="/">Logout</a>
      </div>
    );
  }

  return <header>{navLinks}</header>;
}
