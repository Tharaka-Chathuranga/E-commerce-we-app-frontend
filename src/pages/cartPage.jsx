import CartList from "../components/cart/cartList";
import PaymentSection from "../components/cart/payment";
import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import "./cartPage.css";
import axios from "axios";

console.log(import.meta.env.VITE_REST_API_URL);
const apiOrder = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/order",
});

function CartPage() {
  const [cartList, setCartList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await apiOrder.get("/userOrders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        });

        const updatedCartList = orderResponse.data.filter(
          (item) => item.status === "Ordered"
        );

        setCartList(updatedCartList);

        let total = 0;
        for (let i = 0; i < orderResponse.data.length; i++) {
          const priceString = orderResponse.data[i].item.price;
          const priceFloat = parseFloat(priceString.replace("Rs.", "").trim());
          const priceInt = Math.round(priceFloat);

          total += orderResponse.data[i].quantity * priceInt;
        }
        setSubTotal(total);

        setLoading(false);
      } catch (error) {
        console.log("Error happenig getting Order data", error);
      }
    };

    fetchData();
  }, []);

  const navbarStyle = {
    color: "white",
  };

  function totalAmount(Amount) {
    console.log("hi");
    setSubTotal(Amount);
  }

  function checkout() {
    setCartList([]);
  }

  function removeItemHandler(indexToRemove) {
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === indexToRemove) {
        const priceString = cartList[i].item.price;
        const priceFloat = parseFloat(priceString.replace("Rs.", "").trim());
        const priceInt = Math.round(priceFloat);

        const updatedSubTotal = subTotal - cartList[i].quantity * priceInt;

        const orderToDelete = {
          id: cartList[i].id,
          quantity: cartList[i].quantity,
          item: cartList[i].item,
          status: cartList[i].status,
        };

        const deleteOrder = async () => {
          try {
            const deleteOrderResponse = await apiOrder.delete(
              "/deleteUserOrder",
              {
                data: orderToDelete,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                  "Content-Type": "application/json",
                },
              }
            );
          } catch (error) {
            console.log("Error happenig deleting Order data", error);
          }
        };

        deleteOrder();
        setSubTotal(updatedSubTotal);
      }
    }

    const updatedList = cartList.filter((item) => item.id !== indexToRemove);
    setCartList(updatedList);
  }

  return (
    <div className="cart-page-contennt">
      <div className="cart-page-header-section">
        <Header />
        <Navbar style={navbarStyle} className="cart-page-navbar" />
      </div>

      <div className="cart-page-main-section">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="cart-item-list">
            <div className="cart-list-header">
              <h4 className="cart-title-header">Product</h4>
              <h4 className="cart-name-header">Name</h4>
              <h4 className="cart-count-header">Number of</h4>
              <h4 className="cart-price-header">Price</h4>
              <h4 className="cart-price-header">Action</h4>
            </div>
            <div>
              <CartList
                itemList={cartList}
                setTotalAmount={totalAmount}
                totalAmount={subTotal}
                removeItem={removeItemHandler}
                className="cartList"
              />
            </div>
          </div>
        )}

        <div className="payment-section">
          <PaymentSection
            totalAmount={subTotal}
            orderList={cartList}
            checkout={checkout}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default CartPage;
