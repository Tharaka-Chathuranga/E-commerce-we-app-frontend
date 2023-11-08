import React, { useEffect, useState } from "react";
import defaultImage from "../../assets/layout/background1.jpg";
import "./photoEdit.css";
import axios from "axios";
const apiImage = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/image",
});

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const storedUserJSON = localStorage.getItem("user");
  const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : [];

  const [imageBlob, setImageBlob] = useState(null);

  useEffect(() => {
    try {
      fetch(
        import.meta.env.VITE_REST_API_URL +
          `/image/fileSystem/${storedUser.imageDataId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          const objectUrl = URL.createObjectURL(blob);
          console.log(objectUrl);
          setSelectedImage(objectUrl);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
          setSelectedImage(defaultImage);
        });
    } catch (error) {
      console.error("No Profile Photo:", error);
      setSelectedImage(defaultImage);
    }
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      const formData = new FormData();

      formData.append("image", file);
      formData.append("relation", "user");
      console.log(formData);
      try {
        const responseUserImageDelete = await apiImage.post(
          "/fileSystem/deleteUserImage",
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error Deleting the Photo:", error);
      }

      try {
        const responseUserImageChange = await apiImage.post(
          "/fileSystem",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(responseUserImageChange);

        const localUserJSON = localStorage.getItem("user");
        const localUser = localUserJSON ? JSON.parse(localUserJSON) : {};
        localUser.imageDataId = responseUserImageChange.data;
        localStorage.setItem("user", JSON.stringify(localUser));

        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error Uploading the Photo:", error);
      }
    }
  };

  const handleEditClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleUploadDefaultImage = async (e) => {
    try {
      const responseUserImageDelete = await apiImage.post(
        "/fileSystem/deleteUserImage",
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(responseUserImageDelete);
    } catch (error) {
      console.error("Error Deleting the Photo:", error);
    }

    setSelectedImage(defaultImage);
  };

  return (
    <div className="user-image-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="imageInput"
      />
      <div className="image-upload-container">
        <div className="rounded-image">
          <img src={selectedImage} alt="Selected" className="rounded-image" />
        </div>
      </div>
      <div className="edit-icon" onClick={handleEditClick}>
        <i className="fa fa-pencil" aria-hidden="true">
          Edit
        </i>
      </div>
      <div className="user-name">
        {storedUser.firstname} {storedUser.lastname}
      </div>
      <button
        className="user-page-remove-image"
        onClick={handleUploadDefaultImage}
      >
        Remove Image
      </button>
    </div>
  );
};

export default ImageUpload;
