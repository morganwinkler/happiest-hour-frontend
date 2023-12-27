/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { Logout } from "./Logout";

export function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  let navLinks;
  if (localStorage.jwt === undefined) {
    navLinks = (
      <nav className="navbar navbar-expand-lg bg-light">
        <h2 className="navbar-brand" style={{ paddingLeft: "15px" }}>
          Happiest Hour
        </h2>
      </nav>
    );
  } else {
    if (currentPath === "/") {
      navLinks = (
        <nav className="navbar navbar-expand-lg bg-light">
          <h2 className="navbar-brand" style={{ paddingLeft: "15px" }}>
            Happiest Hour
          </h2>
          <div className="nav">
            <div className="nav-item" style={{ marginLeft: "50px", marginRight: "50px" }}>
              <Link to="/myprofile" className="nav-link" style={{ color: "black" }}>
                {" "}
                My Profile
              </Link>
            </div>
            <div className="nav-item nav-link">
              <Logout style={{ color: "black" }} />
            </div>
          </div>
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
        <nav className="navbar navbar-expand-lg bg-light">
          <h2 className="navbar-brand" style={{ paddingLeft: "15px" }}>
            Happiest Hour
          </h2>
          <div className="nav-item" style={{ marginLeft: "50px", marginRight: "50px" }}>
            <Link to="/" className="nav-link">
              {" "}
              Home
            </Link>
          </div>
          <div className="nav-item" style={{ marginLeft: "50px", marginRight: "50px" }}>
            <Link to="/myprofile" className="nav-link">
              {" "}
              My Profile
            </Link>
          </div>
          <div className="nav-item" style={{ marginLeft: "50px", marginRight: "50px" }}>
            <Logout />
          </div>
        </nav>
      );
    }
  }

  return <header>{navLinks}</header>;
}
