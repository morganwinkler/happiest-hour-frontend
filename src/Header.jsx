/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom";
// import { Logout } from "./Logout";

export function Header() {
  return (
    <div>
      <header>
        {/* navbar from bootsrap */}
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Happiest Hour
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item" style={{ marginLeft: "10px", marginRight: "10px" }}>
                  Home
                </li>
                <li className="nav-item" style={{ marginLeft: "10px", marginRight: "10px" }}>
                  Add a Bar
                </li>
                <li className="nav-item" style={{ marginLeft: "10px", marginRight: "10px" }}>
                  View All Bars
                </li>
                <li className="nav-item" style={{ marginLeft: "10px", marginRight: "10px" }}>
                  Sign Up
                </li>
                <li className="nav-item dropdown">
                  <li
                    className="nav-item dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  >
                    Current Users
                  </li>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">Log In</li>
                    <li className="dropdown-item">Log Out</li>
                    <li className="dropdown-item">My Profile</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
