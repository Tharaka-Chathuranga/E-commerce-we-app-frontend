import { Link, NavLink } from "react-router-dom";

import React, { useState, useEffect } from "react";
import "./navbar.css";

function Navbar(props) {
  const loginStatus =
    localStorage.getItem("userLogged") !== null ? true : false;
  const [userLogged, setUserLogged] = useState(loginStatus);
  const [menuIconClicked, setMenuIconClicked] = useState(false);
  const [searchIconClicked, setSearchIconClicked] = useState(false);
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
  function searchCloseHandler() {
    setSearchIconClicked(false);
  }
  function searchOpenHandler() {
    setSearchIconClicked(true);
  }
  function menuCloseHandler() {
    setMenuIconClicked(false);
  }
  function menuOpenHandler() {
    setMenuIconClicked(true);
  }
  return (
    <div className="navbar-container">
      <div className="home">
        <NavLink to="/" className="navbar-list-item-link">
          <i className="fas fa-home"></i>
        </NavLink>
      </div>

      <ul
        className={
          screenWidth < 990
            ? menuIconClicked
              ? "navbar-list-open"
              : "navbar-hidden"
            : "navbar-list"
        }
      >
        <li className="products  navbar-list-item">
          <NavLink to="/About" scrollToAbout={true}>
            About Us
          </NavLink>
        </li>

        <li className="products  navbar-list-item">
          <NavLink to="/Products">Products</NavLink>
        </li>
        <li className="discount  navbar-list-item">
          <NavLink to="/Discount">Discount</NavLink>
        </li>

        {userLogged ? (
          <li className="purchase-OrderList">
            <NavLink to="/PurchaseOrder">
              <span className="inline-text">Purchase Order</span>
            </NavLink>
          </li>
        ) : null}
      </ul>

      {screenWidth < 990 ? (
        menuIconClicked ? (
          <div className="user-container-navbar">
            <button className="menu-button" onClick={menuCloseHandler}>
              <i className="fas fa-times-circle"></i>
            </button>
          </div>
        ) : (
          <div className="user-container-navbar">
            <button className="menu-button" onClick={menuOpenHandler}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        )
      ) : null}
    </div>
  );
}
export default Navbar;
