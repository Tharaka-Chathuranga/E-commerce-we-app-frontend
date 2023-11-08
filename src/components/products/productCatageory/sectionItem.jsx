import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sectionItem.css";
import axios from "axios";

const apiOrder = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/order",
});

const apiItem = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/item",
});

function SectionItem(props) {
  const UserStatus = JSON.parse(localStorage.getItem("userLogged"));
  const [selectedImage, setSelectedImage] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  let dataToSend = { cart: cartCount, itemData: props };

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    for (let i = 0; i < props.user.length; i++) {
      let localUser = JSON.parse(localStorage.getItem("user"));
      if (props.user[i].id == localUser.id) {
        setIsFavorite(true);
      }
    }
    console.log(props.category);

    const fetchImage = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_REST_API_URL +
            `/image/productFileSystem/${props.thumb}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        setSelectedImage(objectUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [props.thumb]);

  const AddCartHandler = async (product) => {
    let order = {
      quantity: cartCount,
      item: product,
      status: "Ordered",
    };
    if (cartCount >= 1) {
      try {
        const orderResponse = await apiOrder.post("/createOrder", order, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        });
        setCartCount(0);
        console.log(orderResponse);

        console.log(cartCount);
      } catch (error) {
        console.log("Error When Creating Order", error);
      }
    } else {
      console.log("You have to select at least one item");
    }
  };

  function CartIncreaseHandler() {
    setCartCount(cartCount + 1);
  }

  function CartDecreaseHandler() {
    if (cartCount > 0) {
      setCartCount(cartCount - 1);
    }
  }

  const handleToggleFavorite = async (e) => {
    const itemBody = {
      id: props.id,
      name: props.product_name,
      price: props.price,
      discount: props.discount,
    };

    if (isFavorite) {
      try {
        const responseCreateItem = await apiItem.put(
          "/deleteSavedItem",
          itemBody,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (responseCreateItem.status === 200) {
        } else {
          console.log("deleting Saved Item failed");
        }
        setIsFavorite(false);
        if (props.changeItem !== null) {
          props.changeItem(responseCreateItem.data);
        }
      } catch (error) {
        console.error("Error deleting Saved Item:", error);
      }
    } else {
      try {
        const responseCreateItem = await apiItem.put(
          "/createSavedItem",
          itemBody,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (responseCreateItem.status === 200) {
        } else {
          console.log("Creating Saved Item failed");
        }
      } catch (error) {
        console.error("Error Creating Saved Item:", error);
      }

      setIsFavorite(true);
    }
  };

  return (
    <div className="product-card" key={props.id}>
      <Link
        to={{
          pathname: `/products/Item/${props.id}/${cartCount}`,
          state: { data: props },
        }}
      >
        {" "}
        <img className="product-card__image" src={selectedImage} />
      </Link>
      {props.discount != "" ? (
        <div className="section-item-discount">{props.discount}</div>
      ) : null}

      <p className="product-card__brand">{props.product_name}</p>
      <p className="product-card__description">
        {props.brand != "" ? props.brand : null}
      </p>
      <p className="product-card__price">
        {" "}
        {props.price}{" "}
        {props.category === "Vegetable" || props.category === "Fruit"
          ? "Per 1Kg"
          : "Per Item"}
      </p>
      <button
        className={`product-card__btn-wishlist ${
          isFavorite ? "is-favorite" : ""
        }`}
        onClick={handleToggleFavorite}
      >
        <svg viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.01163699,14.9053769 C8.72930024,14.7740736 8.41492611,14.6176996 8.07646224,14.4366167 C7.06926649,13.897753 6.06198912,13.2561336 5.12636931,12.5170512 C2.52930452,10.4655288 1.00308384,8.09476443 1.00000218,5.44184117 C0.997549066,2.99198843 2.92175104,1.01242822 5.28303025,1.01000225 C6.41066623,1.00972036 7.49184369,1.4629765 8.28270844,2.2678673 L8.99827421,2.9961237 L9.71152148,2.26559643 C10.4995294,1.45849728 11.5791258,1.0023831 12.7071151,1.00000055 L12.7060299,1.00000225 C15.0693815,0.997574983 16.9967334,2.97018759 17.0000037,5.421337 C17.0038592,8.07662382 15.4809572,10.4530151 12.8850542,12.5121483 C11.9520963,13.2521931 10.9477036,13.8951276 9.94340074,14.4354976 C9.60619585,14.6169323 9.29297309,14.7736855 9.01163699,14.9053769 Z"
            strokeWidth="2"
          />
        </svg>
      </button>
      {UserStatus ? (
        <div className="add-cart-section">
          <div className="add-cart-button">
            <button className="add-cart" onClick={() => AddCartHandler(props)}>
              Add to Cart
            </button>
          </div>
          <div className="section-cart-decrease-button">
            <button
              className="section-cart-decrease"
              onClick={CartDecreaseHandler}
            >
              -
            </button>
          </div>
          <div className="product-count">{cartCount}</div>
          <div className="section-cart-increase-button">
            <button
              className="section-cart-increase"
              onClick={CartIncreaseHandler}
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <div className="inactive-section">
          <Link to="/LoginPage">
            <button className="buy-now">Buy Now</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SectionItem;
