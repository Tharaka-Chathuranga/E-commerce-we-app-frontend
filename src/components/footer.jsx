import { NavLink } from "react-router-dom";
import "./footer.css";
import React from "react";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="E-commerce Logo" />
            <h2>E-commerce Store</h2>
          </div>
          <div className="footer-links">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/Discount">Discount</NavLink>
              </li>
              <li>
                <NavLink to="/Products">Products</NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <h3>Follow Us</h3>
            <a href="#">
              <i className="fab fa-facebook icon-small"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter icon-small"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram icon-small"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 E-commerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
