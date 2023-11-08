import React, { useState } from "react";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/auth",
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    address: "",
    role: "customer",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isPasswordValid = (password) => {
    console.log("hi");
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData });

    console.log(formData.p);
    if (!isPasswordValid(formData.password)) {
      alert(
        "Password must contain at least one letter, one digit, one special character, and be at least 8 characters long."
      );
      return;
    }

    try {
      const response = await apiAuth.post("/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        try {
          const response = await apiAuth.post(
            "/login",
            { username: formData.username, password: formData.password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            localStorage.setItem("jwtToken", response.data.jwt);
            localStorage.setItem("userLogged", true);
          } else {
            console.log("Login Error");
          }
        } catch (error) {
          console.error("Error Requesting :", error);
        }

        console.log("Authentication successful");
        localStorage.setItem("userLogged", true);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/Home");

        // const handleSubmit = async (e) => {
        //   e.preventDefault();

        //   try {
        //     const response = await apiAuth.post(
        //       "/login",
        //       {
        //         username: formData.username,
        //         password: formData.password,
        //       },
        //       {
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //       }
        //     );

        //     console.log(response.data.jwt);

        //     if (response.status === 200) {
        //       console.log(response);
        //       localStorage.setItem("jwtToken", response.data.jwt);
        //       const newResponse = await apiAuth.get("/me", {
        //         headers: {
        //           Authorization: `Bearer ${response.data.jwt}`,
        //           "Content-Type": "application/json",
        //         },
        //       });

        //       console.log(newResponse.data);

        //       if (String(newResponse.data.role) === "customer") {
        //         localStorage.setItem("userLogged", "true"); // Set as string
        //       }

        //       navigate("/Home");
        //     } else {
        //       console.log("Authentication failed");
        //     }
        //   } catch (error) {
        //     console.error("Error authenticating:", error);
        //   }
        // };

        // No need to navigate here
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error authenticating:", error);
    }
  };
  return (
    <div className="user-sign-up">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <span>First Name</span>
          </div>
          <div className="signup-form-group">
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <span>Last Name</span>
          </div>
          <div className="signup-form-group">
            <input
              type="email"
              id="username"
              name="username"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span>Email</span>
          </div>
          <div className="signup-form-group">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <span>Address</span>
          </div>

          <p className="password-requirements">
            Password must have at least one letter, digit,special char, and 8
            characters long.
          </p>

          <div className="signup-form-group">
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
          <div className="user-signup-button">
            <button
              className="signup-button"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="signup-page-link-container">
          <Link to="/">Back</Link>
          <Link to="/LoginPage">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
