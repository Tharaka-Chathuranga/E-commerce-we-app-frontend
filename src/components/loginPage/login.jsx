import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./login.css";
import axios from "axios";
console.log(import.meta.env.VITE_REST_API_URL);
const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/auth",
});

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await apiAuth.post("/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        localStorage.setItem("jwtToken", response.data.jwt);
        localStorage.setItem("userLogged", true);

        const newResponse = await apiAuth.get("/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        });
        localStorage.setItem("user", JSON.stringify(newResponse.data));

        if (String(newResponse.data.role) == "customer") {
          navigate("/Home");

          localStorage.setItem("userLogged", true);
        } else if (String(newResponse.data.role) == "admin") {
          // localStorage.setItem("userLogged", true);
          // localStorage.setItem("user", JSON.stringify(newResponse.data));
          navigate("/AdminPortal");
        }
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error authenticating:", error);
    }
  };

  return (
    <div className="user-login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <input
              type="email"
              id="username-login"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <span>User name</span>
          </div>
          <div className="login-form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span>Password</span>
          </div>

          <div className="user-login-button">
            <button className="login-button" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="login-page-link-container">
          <Link to="/Home">Back</Link>
          <Link to="/SignupPage">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
