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
                <li className="nav-item">Home</li>
                <li className="nav-item">Add a Bar</li>
                <li className="nav-item">View All Bars</li>
                <li className="nav-item">Sign Up</li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Current Users
                  </a>
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
