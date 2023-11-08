import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./adminSectionItem.css";

import axios from "axios";

const apiItem = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/item",
});

function AdminSectionItem(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    for (let i = 0; i < props.user.length; i++) {
      let localUser = JSON.parse(localStorage.getItem("user"));
      if (props.user[i].id == localUser.id) {
        setIsFavorite(true);
      }
    }

    const fetchImage = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_REST_API_URL +
            `/image/productFileSystem/${props.thumb.id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        setSelectedImage(objectUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [props.thumb]);

  function editHandler() {
    const item = {
      id: props.id,
      name: props.product_name,
      discount: props.discount,
      price: props.price,
      fileData: props.thumb,
      brand: props.brand,
      details: props.details,
      category: props.category,
      quantity: props.quantity,
    };

    console.log(item);
    props.changeEditEnableStatus({ editStatus: true, editItem: item });
  }

  return (
    <div className="admin-section-item-card" key={props.id}>
      <div className="remove-icon-admin-container">
        <div className="icon-container">
          <i className="fas fa-pen" onClick={editHandler}></i>
          {/* Delete icon */}
        </div>
      </div>
      <div className="admin-section-item-upper-part">
        <div className="admin-section-item-discount">{props.discount}</div>
        <div className="admin-section-item-image">
          <img className="admin-section-item-image" src={selectedImage} />
        </div>
      </div>

      <div className="admin-section-item-detail">
        <h5 className="admin-section-item-title">{props.product_name}</h5>
        <div className="admin-section-item-price">{props.price}</div>
      </div>
    </div>
  );
}

export default AdminSectionItem;
