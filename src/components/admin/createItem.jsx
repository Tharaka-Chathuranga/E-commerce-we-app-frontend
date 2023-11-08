import React, { useState } from "react";
import "./createItem.css";
import axios from "axios";

const apiItem = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/item",
});
const apiImage = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/image",
});

function CreateItem() {
  const [item, setItem] = useState({
    name: "",
    brand: "",
    price: 0,
    discount: 0,
    category: "Select Category",
    details: "",
    quantity: 0,
    image: null,
  });

  const [nameError, setNameError] = useState(false); // State to track name validation

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleCategoryChange = (event) => {
    setItem({
      ...item,
      category: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setItem({
      ...item,
      image: imageFile,
    });
    console.log(imageFile);
  };

  const handleSubmit = async () => {
    if (item.name.trim() === "") {
      setNameError(true);
      return;
    }
    if (item.price <= 0 || item.discount < 0 || item.discount > 100) {
      alert("Please enter valid price and discount values.");
      return;
    }

    try {
      let itemBody = {
        name: item.name,
        brand: item.brand,
        price: "Rs." + item.price + ".00",
        discount: item.discount + "%",
        category: item.category,
        details: item.details,
        quantity: item.quantity,
      };

      const createItemResponse = await apiItem.post("/createItem", itemBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (createItemResponse.status === 200) {
        console.log(createItemResponse);

        const formData = new FormData();
        formData.append("image", item.image);
        formData.append("relation", `item${createItemResponse.data.id}`);

        console.log(formData.getAll("relation"));

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

        if (responseUserImageChange.status === 200) {
          // Image uploaded successfully
          alert("Item and image uploaded successfully!");

          setItem({
            name: "",
            brand: "",
            price: 0,
            discount: 0,
            category: "Select Category",
            details: "",
            quantity: 0,
            image: null,
          });
        } else {
          alert("Failed to upload the image.");
        }
      } else {
        alert("Failed to create the item.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div className="create-item-container">
      <h2>Create Item</h2>
      <form>
        <div className="create-item-container-input">
          <div className="text-input">
            <div
              className={`create-item-form-field ${nameError ? "error" : ""}`}
            >
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="create-item-name"
                name="name"
                placeholder="Name"
                value={item.name}
                onChange={handleInputChange}
                className="create-item-input-field"
              />
              {nameError && (
                <span className="error-message">Name is required.</span>
              )}
            </div>
            <div className="create-item-form-field">
              <label htmlFor="brand">Brand:</label>
              <input
                type="text"
                id="create-item-brand"
                name="brand"
                placeholder="Brand"
                value={item.brand}
                onChange={handleInputChange}
                className="create-item-input-field"
              />
            </div>
            <div className="create-item-form-field">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="create-item-price"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={handleInputChange}
                className="create-item-input-field"
              />
            </div>
            <div className="create-item-form-field">
              <label htmlFor="discount">Discount:</label>
              <input
                type="number"
                id="create-item-discount"
                name="discount"
                placeholder="Discount"
                value={item.discount}
                onChange={handleInputChange}
                className="create-item-input-field"
              />
            </div>
            <div className="create-item-form-field">
              <label htmlFor="category">Category:</label>
              <select
                id="create-item-category"
                name="category"
                value={item.category}
                onChange={handleCategoryChange}
                className="create-item-select-field"
              >
                <option value="Select Category" disabled>
                  Select Category
                </option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruit">Fruits</option>
                <option value="Meats">Meats</option>
                <option value="Fish">Fish</option>
                <option value="Grocery">Grocery</option>
                <option value="Frozen">Frozen Food</option>
                <option value="Beverages">Beverages</option>
                <option value="Household">Household</option>
              </select>
            </div>
            <div className="create-item-form-field">
              <label htmlFor="details">Details:</label>
              <input
                type="text"
                id="create-item-details"
                name="details"
                placeholder="Details"
                value={item.details}
                onChange={handleInputChange}
                className="create-item-input-field"
              />
            </div>
            <div className="create-item-form-field">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="create-item-quantity"
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={handleInputChange}
                className="create-item-input-field"
              />
            </div>
          </div>
          <div className="image-input">
            <div className="create-item-form-field">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="create-item-image"
                name="image" // Make sure this matches the key in the state
                accept="image/*"
                onChange={handleImageChange}
                className="create-item-input-field"
              />
              <div className="create-item-image">
                {item.image && (
                  <img
                    src={URL.createObjectURL(item.image)}
                    alt="Image Preview"
                    className="image-preview"
                    width="200"
                    height="150"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="create-itemsubmit-button"
        >
          Create Item
        </button>
      </form>
    </div>
  );
}

export default CreateItem;
