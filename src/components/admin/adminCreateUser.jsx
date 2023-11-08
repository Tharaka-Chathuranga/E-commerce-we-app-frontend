import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./adminCreateUser.css";
import axios from "axios";
const apiImage = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/image",
});

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/auth",
});
function AdminCreateUser() {
  const fileInputRef = useRef(null);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "customer",
    password: "",
    reenterPassword: "",
    address: "",
    telephone: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    console.log("Image selected:", imageFile);
    setUser({
      ...user,
      image: imageFile,
    });
  };

  const displayErrors = (field) => {
    if (errors[field]) {
      alert(`Error in ${field}: ${errors[field]}`);
      return <div className="error-message">{errors[field]}</div>;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({});
    setPasswordMatchError(false);

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "reenterPassword",
    ];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!user[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Check if "Re-enter Password" matches "Password"
    if (user.password !== user.reenterPassword) {
      setPasswordMatchError(true);
      toast.error("Passwords do not match");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const data = {
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.email,
      password: user.password,
      address: user.address,
      role: user.userType,
    };
    // If validation is successful, proceed with form submission
    try {
      const response = await apiAuth.post("/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(response);

        const responseJWT = await apiAuth.post(
          "/login",
          { username: user.email, password: user.password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(user.image);
        if (user.image) {
          const formData = new FormData();

          formData.append("image", user.image);
          formData.append("relation", "user");
          console.log(formData);
          console.log(formData.get("image"));
          try {
            const responseUserImageChange = await apiImage.post(
              "/fileSystem",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${responseJWT.data.jwt}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(responseUserImageChange);
          } catch (error) {
            console.error("Error uploading the Photo:", error);
          }
        }

        setUser({
          firstName: "",
          lastName: "",
          email: "",
          userType: "customer",
          password: "",
          reenterPassword: "",
          address: "",
          telephone: "",
          image: null,
        });
        fileInputRef.current.value = null;
        alert("User registered successfully");
      }
    } catch (error) {
      console.error("Error Requesting:", error);

      if (error.response && error.response.status === 400) {
        // Handle the 400 Bad Request error
        alert("Bad Request: The password is not in the correct format");
      } else if (error.response && error.response.status === 409) {
        // Handle other errors
        alert("Already registered User");
      }
    }
  };

  return (
    <div className="admin-create-user">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} className="admin-create-user-form ">
        <div className="admin-create-form-group">
          <label htmlFor="firstName" className="admin-create-label">
            First Name:
          </label>
          <input
            type="text"
            id="admin-create-firstName"
            className="input-field-create-admin"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
          {displayErrors("firstName")}
        </div>

        <div className="admin-create-form-group">
          <label htmlFor="lastName" className="admin-create-label">
            Last Name:
          </label>
          <input
            type="text"
            id="admin-create-lastName"
            className="input-field-create-admin"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
          {displayErrors("lastName")}
        </div>

        <div className="admin-create-form-group">
          <label htmlFor="email" className="admin-create-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="input-field-create-admin"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {displayErrors("Email")}
        </div>
        <div className="admin-create-form-group">
          <label htmlFor="userType" className="admin-create-label">
            User Type:
          </label>
          <select
            id="userType"
            name="userType"
            value={user.userType}
            onChange={handleChange}
            className="admin-create-select"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            {/* Add more user types if needed */}
          </select>
        </div>

        <div className="admin-create-form-group">
          <label htmlFor="password" className="admin-create-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field-create-admin"
            value={user.password}
            onChange={handleChange}
          />
          {displayErrors("Password")}
        </div>
        <div className="admin-create-form-group">
          <label htmlFor="reenterPassword" className="admin-create-label">
            Re-enter Password:
          </label>
          <input
            type="password"
            id="reenterPassword"
            className="input-field-create-admin"
            name="reenterPassword"
            value={user.reenterPassword}
            onChange={handleChange}
          />
          {displayErrors("Re Enter Password")}
        </div>
        <div className="admin-create-form-group">
          <label htmlFor="address" className="admin-create-label">
            Address:
          </label>
          <textarea
            id="address"
            className="textarea-field-create-admin"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
          {displayErrors("Address")}
        </div>
        <div className="admin-create-form-group">
          <label htmlFor="telephone" className="admin-create-label">
            Telephone:
          </label>
          <input
            type="tel"
            id="telephone"
            className="input-field-create-admin"
            name="telephone"
            value={user.telephone}
            onChange={handleChange}
          />
          {displayErrors("Telephone")}
        </div>

        <div className="admin-create-form-group">
          <label htmlFor="profilePicture" className="admin-create-label">
            Profile Picture:
          </label>
          <input
            type="file"
            id="image"
            className="create-item-image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <div className="create-account-image">
            {user.image && (
              <img
                src={URL.createObjectURL(user.image)}
                alt="Image Preview"
                className="admin-create-user-image-preview"
                width="200"
                height="150"
              />
            )}
          </div>
        </div>

        <div className="error-messages">
          {passwordMatchError && (
            <div className="error-message">Passwords do not match</div>
          )}
        </div>

        <button className="admin-create-user-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default AdminCreateUser;
