import React, { useState } from "react";
import ToggleIcon from "../../../assets/navbarProductItem/bars-solid.svg";
import "./navbarProductItem.css";
import { Link } from "react-router-dom";

function NavBarProductItem() {
  const [searchKey, setSearchKey] = useState({ key: "", catageory: "" });
  const [isClicked, setIsClicked] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }
  function searchChangeHandler(event) {
    setSearchKey({ ...searchKey, key: event.target.value });
  }
  function selectChangeHandler(event) {
    setSearchKey({ ...searchKey, catageory: event.target.value });
  }

  console.log(searchKey);

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <div
            className={`toggle-icon ${isClicked ? "clicked" : ""}`}
            onClick={handleClick}
          >
            <img src={ToggleIcon} alt="Toggle Icon" />
          </div>
          <div className="navbar-home">
            <a href="#">Home</a>
          </div>
        </div>
        <div className="search-bars">
          <form action="#" className="search-form">
            <div className="input-text-search">
              <input
                type="search"
                className="form-control"
                style={{ width: "55%" }}
                placeholder="Search"
                onChange={searchChangeHandler}
              />
              <select
                className="catagories-select"
                onChange={selectChangeHandler}
              >
                <option value="" disabled selected hide>
                  Catagories
                </option>

                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Meats">Meats</option>
                <option value="Fish">Fish</option>
                <option value="Grocery">Grocery</option>
                <option value="frozen">frozen Food</option>
                <option value="Beverages">Beverages</option>
                <option value="Household">Household</option>
              </select>
              <button className="btn btn-primary">
                <Link
                  className="sectiom-item-Link"
                  to={{
                    pathname: `/products/${searchKey.catageory}/${searchKey.key}`,
                  }}
                >
                  <i className="fa fa-search"></i>
                </Link>
              </button>
            </div>
          </form>
        </div>
        {userLogged ? (
          <div className="float-lg-end">
            <div
              className="widget-header mx-2 text-center"
              style={{ minWidth: "44px" }}
            >
              <a
                href="page-user-signup.html"
                className="d-inline-block align-middle"
              >
                <span className="fs-5 d-inline-block">
                  <i className="fa fa-user"></i>
                </span>
                <small
                  style={{ maxWidth: "80px" }}
                  className="d-block text-truncate"
                >
                  Profile
                </small>
              </a>
            </div>
            <div
              className="widget-header mx-2 text-center"
              style={{ minWidth: "44px" }}
            >
              <a href="#" className="d-inline-block align-middle">
                <span className="icon-28 fs-5 d-inline-block position-relative">
                  <i className="fa fa-comment-dots"></i>{" "}
                  <span className="notify">1</span>
                </span>
                <small
                  style={{ maxWidth: "80px" }}
                  className="d-block text-truncate"
                >
                  Message
                </small>
              </a>
            </div>
            <div
              className="widget-header mx-2 text-center"
              style={{ minWidth: "44px" }}
            >
              <a href="#" className="d-inline-block align-middle">
                <span className="fs-5 d-inline-block">
                  <i className="fa fa-heart"></i>
                </span>
                <small
                  style={{ maxWidth: "80px" }}
                  className="d-block text-truncate"
                >
                  Saved
                </small>
              </a>
            </div>
            <div
              className="widget-header mx-2 text-center"
              style={{ minWidth: "44px" }}
            >
              <a href="#" className="d-inline-block align-middle">
                <span className="fs-5 d-inline-block">
                  <i className="fa fa-shopping-cart"></i>
                </span>
                <small
                  style={{ maxWidth: "80px" }}
                  className="d-block text-truncate"
                >
                  Cart1
                </small>
              </a>
            </div>
          </div>
        ) : (
          <div className="external-nav-button-holder">
            <div className="external-nav-button">Register</div>
            <div className="nav-item-divider">|</div>
            <div className="external-nav-button">Login</div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavBarProductItem;
