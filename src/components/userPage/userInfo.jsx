import React, { useState } from "react";
import "./userInfo.css";
import axios from "axios";

const apiUser = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/user",
});

const UserInfo = () => {
  let localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({
    firstname: localUser.firstname,
    lastname: localUser.lastname,
    username: localUser.email,
    address: localUser.address,
    telephone: localUser.telephone,
  });

  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    console.log(jwtToken);

    try {
      let newuser = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        address: user.address,
        telephone: parseInt(user.telephone),
      };

      (localUser.firstname = user.firstname),
        (localUser.lastname = user.lastname),
        (localUser.username = user.username),
        (localUser.telephone = parseInt(user.telephone, 10)),
        localStorage.setItem("user", JSON.stringify(localUser));
      const userSaveResponse = await apiUser.put(
        "/editUserDetails",
        JSON.stringify(newuser),
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (userSaveResponse) {
        console.log("Saving edited user:", userSaveResponse.data);
      }

      setEditing(false);
    } catch (error) {
      console.error("Error while saving edited user:", error);
    }
  };

  return (
    <div className="user-page-User-details">
      {editing ? (
        <div id="user-page-Edit-section">
          <h2>Edit Profile Details</h2>
          <form onSubmit={handleSave}>
            <div className="input-box-user-page">
              <input
                type="text"
                id="first-name"
                name="firstname"
                value={user.firstname}
                onChange={handleInputChange}
                required
              />
              <span>First name</span>
            </div>
            <div className="input-box-user-page">
              <input
                type="text"
                id="last-name"
                name="lastname"
                value={user.lastname}
                onChange={handleInputChange}
                required
              />
              <span>Last name</span>
            </div>
            <div className="input-box-user-page">
              <input
                type="email"
                id="email"
                name="email"
                value={user.username}
                onChange={handleInputChange}
                required="required"
              />
              <span>Email</span>
            </div>
            <div className="input-box-user-page">
              <input
                type="text"
                id="address"
                name="address"
                value={user.address}
                onChange={handleInputChange}
                required="required"
              />
              <span>Address</span>
            </div>
            <div className="input-box-user-page">
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={user.telephone}
                onChange={handleInputChange}
                required="required"
              />
              <span>Telephone</span>
            </div>

            <div className="user-info-button">
              <button type="submit">Save</button>
              <button onClick={toggleEditing}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="user-page-details-section">
          <h2>My Personal Details</h2>
          <p>
            Name: {user.firstname} {user.lastname}
          </p>
          <p>Email: {user.username}</p>
          <p>Address: {user.address}</p>
          <p>Telephone: {user.telephone}</p>

          <div className="user-page-details-button">
            <button type="button" onClick={toggleEditing}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
