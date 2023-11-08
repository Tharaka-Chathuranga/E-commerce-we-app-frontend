import "./cartItem.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

console.log(import.meta.env.VITE_REST_API_URL);
const apiOrder = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/order",
});

function CartItem(props) {
  const priceString = props.cartItem.item.price;
  const priceFloat = parseFloat(priceString.replace("Rs.", "").trim());
  const priceInt = Math.round(priceFloat);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/image/productFileSystem/${props.cartItem.item.fileData.id}`
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
  }, [props.cartItem.item.fileData.id]);

  function closeHandler() {
    props.closeButtonHandler(props.cartItem.id);
  }

  function CartIncreaseHandler() {
    if (props.cartItem.quantity >= 1) {
      const cartCount = props.cartItem.quantity;

      props.cartItem.quantity = cartCount + 1;

      props.setItemAmount(props.itemsAmount + priceInt * 1);

      const orderToChange = {
        id: props.cartItem.id,
        quantity: props.cartItem.quantity,
        item: props.cartItem.item,
        status: props.cartItem.status,
      };

      const changeOrder = async () => {
        console.log(orderToChange);
        try {
          const changeOrderResponse = await apiOrder.put(
            "/changeOrder",
            orderToChange,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          console.log("Error happenig changing Order data", error);
        }
      };

      changeOrder();
    }
  }

  function CartDecreaseHandler() {
    if (props.cartItem.quantity > 1) {
      const cartCount = props.cartItem.quantity;

      props.cartItem.quantity = cartCount - 1;

      props.setItemAmount(props.itemsAmount - priceInt * 1);

      const orderToChange = {
        id: props.cartItem.id,
        quantity: props.cartItem.quantity,
        item: props.cartItem.item,
        status: props.cartItem.status,
      };

      const changeOrder = async () => {
        console.log(orderToChange);
        try {
          const changeOrderResponse = await apiOrder.put(
            "/changeOrder",
            orderToChange,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          console.log("Error happenig changing Order data", error);
        }
      };

      changeOrder();
    }
  }

  return (
    <div className="cart-item-container" key={props.cartItem.id}>
      <div className="cart-item-image">
        <img src={selectedImage} />
      </div>
      <div className="cart-item-details">{props.cartItem.item.name}</div>
      <div className="item-quantity">
        <button className="decrease-cart-button" onClick={CartDecreaseHandler}>
          <i class="fa fa-minus"></i>
        </button>
        <div className="cart-count">{props.cartItem.quantity}</div>
        <button className="increase-cart-button" onClick={CartIncreaseHandler}>
          <i class="fa fa-plus"></i>
        </button>
      </div>
      <div className="items-total-price">
        RS.{props.cartItem.quantity * priceInt}.00
      </div>
      <div className="remove-cart-item">
        <button onClick={closeHandler}>
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
  );
}

export default CartItem;
