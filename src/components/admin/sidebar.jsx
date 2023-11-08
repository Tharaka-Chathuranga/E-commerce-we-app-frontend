import React from "react";
import logo from "../../assets/logo.png";
import "./sidebar.css";

function Sidebar({ selectedButton, updateSelectedButton }) {
  return (
    <div className="sidebar-container">
      <img src={logo} alt="Logo" />
      <ul className="sidebar-list">
        <li
          className={`sidebar-list-item ${
            selectedButton === "Dashboard" ? "active" : ""
          }`}
        >
          <button onClick={() => updateSelectedButton("Dashboard")}>
            <div className="sidebar-item">
              <h3 className="sidebar-title">Dashboard</h3>
            </div>
          </button>
        </li>

        <li
          className={`sidebar-list-item ${
            selectedButton === "Create Products" ? "active" : ""
          }`}
        >
          <button onClick={() => updateSelectedButton("Create Products")}>
            <div className="sidebar-item">
              <h3 className="sidebar-title">Create Products</h3>
            </div>
          </button>
        </li>

        <li
          className={`sidebar-list-item ${
            selectedButton === "View Products" ? "active" : ""
          }`}
        >
          <button onClick={() => updateSelectedButton("View Products")}>
            <div className="sidebar-item">
              <h3 className="sidebar-title">View Products</h3>
            </div>{" "}
          </button>
        </li>

        <li
          className={`sidebar-list-item ${
            selectedButton === "View Orders" ? "active" : ""
          }`}
        >
          <button onClick={() => updateSelectedButton("View Orders")}>
            <div className="sidebar-item">
              <h3 className="sidebar-title">View Orders</h3>
            </div>{" "}
          </button>
        </li>

        <li
          className={`sidebar-list-item ${
            selectedButton === "View Payments " ? "active" : ""
          }`}
        >
          <button onClick={() => updateSelectedButton("Create Account")}>
            <div className="sidebar-item">
              <h3 className="sidebar-title">Create Account</h3>
            </div>{" "}
          </button>
        </li>

        <li
          className={`sidebar-list-item ${
            selectedButton === "View Customer" ? "active" : ""
          }`}
        >
          <button onClick={() => updateSelectedButton("View Customer")}>
            <div className="sidebar-item">
              <h3 className="sidebar-title">View Customers</h3>
            </div>{" "}
          </button>
        </li>

        <li
          className={`sidebar-list-item ${
            selectedButton === "Log Out" ? "active" : ""
          }`}
        >
          <button onClick={() => updateSelectedButton("Log Out")}>
            <div className="sidebar-item">
              <h3 className="sidebar-title">Log Out</h3>
            </div>{" "}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
