import React, { useState, useEffect } from "react";
import "./createItem.css";
import axios from "axios";

const apiItem = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/item",
});
const apiImage = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/image",
});

function EditItem(props) {
  console.log(props.item);

  const priceString = props.item.price;
  const priceFloat = parseFloat(priceString.replace("Rs.", "").trim());
  const priceInt = Math.round(priceFloat);
  const percentageString = props.item.discount;
  const percentageValue = parseInt(percentageString, 10);

  const [item, setItem] = useState({
    name: props.item.name,
    brand: props.item.brand,
    price: priceInt,
    discount: percentageValue,
    category: props.item.category,
    details: props.item.details,
    quantity: props.item.quantity,
    image: "",
  });

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_REST_API_URL +
            `/image/productFileSystem/${props.item.fileData.id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        console.log(blob);

        // Create a File object from the Blob
        const imageFileName = props.item.fileData.name; // Replace with the actual file name
        const imageFile = new File([blob], imageFileName, { type: blob.type });
        console.log(imageFile);
        setItem({
          ...item,
          image: imageFile, // Assuming `image` is the key in your state for the image
        });
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [props.item.fileData]);

  const [nameError, setNameError] = useState(false);
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
        id: props.item.id,
        name: item.name,
        brand: item.brand,
        price: "Rs." + item.price + ".00",
        discount: item.discount + "%",
        category: item.category,
        details: item.details,
        quantity: item.quantity,
      };

      const editItemResponse = await apiItem.put("/editItem", itemBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (editItemResponse.status === 200) {
        console.log(editItemResponse);
        const formData = new FormData();
        formData.append("image", item.image);
        formData.append("relation", `item${editItemResponse.data.id}`);
        const deleteFileBody = {
          itemId: props.item.id,
          fileId: props.item.fileData.id,
        };
        console.log(deleteFileBody);
        try {
          const responseImageDelete = await apiImage.put(
            "/deleteImage",
            deleteFileBody,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(responseImageDelete);
        } catch (error) {
          console.error("Error Deleting the Photo:", error);
        }

        try {
          const responseItemImageChange = await apiImage.post(
            "/fileSystem",
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(responseItemImageChange);
        } catch (error) {
          console.error("Error Uploading the Photo:", error);
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
                name="image"
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
                    height="200"
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
          Save Edit Item
        </button>
      </form>
    </div>
  );
}

export default EditItem;
