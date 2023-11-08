import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./header.css";
import Navbar from "./navbar";

function Header() {
  const loginStatus =
    localStorage.getItem("userLogged") !== null ? true : false;
  const [userLogged, setUserLogged] = useState(loginStatus);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleWindowResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");

    localStorage.removeItem("userLogged");
    setUserLogged(false);
  };

  return (
    <header>
      <div className="main-navbar">
        <div className="navbar-logo-container">
          <img src={Logo} alt="" className="header-logo" />
        </div>

        <div className="navbar-user-container">
          {userLogged ? (
            <div className="user-container">
              <Link to="/UserPage" className="user-container-link profile-icon">
                <div className="user-container-icon">
                  <i className="fa fa-user"></i>
                </div>
              </Link>

              <Link to="/SavedItem" className="user-container-link save-item">
                <div className="user-container-icon">
                  <span>
                    <i className="fa fa-heart">
                      {/* <span className="notification"></span> */}
                    </i>
                  </span>
                </div>
              </Link>

              <Link to="/CartPage" className="user-container-link save-item">
                <div className="user-container-icon">
                  <span>
                    <i className="fa fa-shopping-cart">
                      {/* <span className="notification"></span> */}
                    </i>
                  </span>
                </div>
              </Link>

              <Link
                to="/Home"
                className="user-container-link save-item"
                onClick={handleLogout}
              >
                <div className="user-container-icon">
                  <span>
                    <i className="fas fa-sign-out-alt"></i>
                  </span>
                </div>
              </Link>
            </div>
          ) : (
            <div className="user-container">
              <Link
                to="/SignUpPage"
                className="user-container-link register-navigation"
              >
                Register
              </Link>
              <Link
                to="/LoginPage"
                className="user-container-link login-navigation"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
