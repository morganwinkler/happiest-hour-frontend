/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { Logout } from "./Logout";

export function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  let navLinks;
  if (localStorage.jwt === undefined) {
    navLinks = (
      <nav>
        <h2>Happiest Hour</h2>
      </nav>
    );
  } else {
    if (currentPath === "/moreinfo") {
      navLinks = (
        <nav>
          <Link to="/"> Home</Link>
          <Link to="/myprofile"> My Profile</Link>
          <Logout />
        </nav>
      );
    } else if (currentPath === "/myprofile") {
      navLinks = (
        <nav>
          <Link to="/"> Home</Link>
          <Logout />
        </nav>
      );
    } else {
      navLinks = (
        <nav>
          <Link to="/myprofile"> My Profile</Link>
          <Logout />
        </nav>
      );
    }
  }

  return <header>{navLinks}</header>;
}
