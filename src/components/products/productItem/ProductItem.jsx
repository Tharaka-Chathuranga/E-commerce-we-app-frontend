import { useState, useEffect } from "react";
import "./ProductItem.css";
import { useParams } from "react-router-dom";
import FruitCard from "../../dataComponent/fruitData";
import axios from "axios";
const apiItem = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/item",
});

const apiOrder = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/order",
});

function ProductItem(props) {
  const Params = useParams();
  const [item, setItem] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numberAsLong = parseInt(Params.itemId, 10);
        const send = { id: numberAsLong };
        const itemResponse = await apiItem.post("/getItem", send, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setItem(itemResponse.data);

        // Check if item is available before fetching the image
        if (itemResponse.data && itemResponse.data.fileData) {
          const response = await fetch(
            import.meta.env.VITE_REST_API_URL +
              `/image/productFileSystem/${itemResponse.data.fileData.id}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);

          setSelectedImage(objectUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [cartCount, setCartCount] = useState(parseInt(Params.cartCount, 10));

  function CartIncreaseHandler() {
    setCartCount(cartCount + 1);
  }

  function CartDecreaseHandler() {
    if (cartCount > 0) {
      setCartCount(cartCount - 1);
    }
  }

  const AddCartHandler = async (product) => {
    let order = {
      quantity: cartCount,
      item: item,
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

  return (
    <div className="card-container">
      <div className="Card" key={Params.itemId}>
        <div className="product-itemimage-container">
          <img
            className="product-item-image"
            src={selectedImage}
            alt="Responsive Image"
          />
        </div>
        <div className="product-item-detail-container">
          <div className="product-item-title">
            <h3 className="title">{item.name}</h3>
          </div>
          <div className="product-item-title">
            <h3 className="title">{item.brand != "" ? item.brand : null}</h3>
          </div>
          <div className="product-item-title">
            <h3 className="title">
              {item.discount != "" ? item.discount + " off" : null}
            </h3>
          </div>
          <div className="product-item-price"> {item.price}</div>
          <div className="product-description">
            <p>{item.details}</p>
          </div>
          <div className="add-cart-item">
            <div className="add-cart-button-product-item">
              <button onClick={AddCartHandler}>Add to Cart</button>
            </div>
            <div className="decrease-cart">
              <button onClick={CartDecreaseHandler}>-</button>
            </div>
            <div className="product-count">{cartCount}</div>
            <div className="increase-cart">
              <button onClick={CartIncreaseHandler}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
