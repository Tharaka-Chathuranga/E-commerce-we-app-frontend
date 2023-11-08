import "./orderedItem.css";
import CloseIcon from "../../assets/cartPage/closeIcon.jpg";
import React, { useState, useEffect } from "react";

function OrderedItem(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const priceString = props.data.item.price;
  const priceFloat = parseFloat(priceString.replace("Rs.", "").trim());
  const priceInt = Math.round(priceFloat);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_REST_API_URL +
            `/image/productFileSystem/${props.data.item.fileData.id}`
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
  }, []);

  console.log(props.data);
  function closeHandler() {
    props.closeButtonHandler(props.data.id);
  }

  return (
    <div className="ordered-item-container" key={props.id}>
      <div className="ordered-item-image">
        <img src={selectedImage} />
      </div>
      <div className="ordered-item-details">
        <h3>{props.data.item.name}</h3>
        <h4>{props.data.item.price}</h4>
      </div>
      <div className="ordered-item-details">
        <h3>
          Quantity : {props.data.quantity}{" "}
          {props.data.item.category === "Vegetable" ||
          props.data.item.category === "Fruit"
            ? "Per 1Kg"
            : "Per Item"}
        </h3>
        <h4>Amount : Rs.{priceInt * props.data.quantity}.00</h4>
      </div>
      <div className="ordered-item-status">
        <h3>{props.data.status}</h3>
      </div>
      <div className="ordered-date">{props.data.date}</div>
      {props.data.status === "Dilivered" ? (
        <div className="delivered-date">Date</div>
      ) : null}

      {/* <div className="remove-cart-item">
        <button onClick={closeHandler}>
          <img src={CloseIcon} />
        </button>
      </div> */}
    </div>
  );
}

export default OrderedItem;
