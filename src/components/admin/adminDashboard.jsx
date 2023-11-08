import React, { useEffect, useState } from "react";
import "./adminDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";

const apiUser = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/user",
});

const apiOrder = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/order",
});

function AdminDashboard() {
  const [image, setImage] = useState(null);
  const [newCustomers, setNewCustomers] = useState(0);
  const [purchaseOrders, setPurchaseOrders] = useState(0);
  const [mostOrderedProducts, setMostOrderedProducts] = useState({
    productName: "",
    productPrice: "",
    productDetails: "",
    productDiscount: "",
    productQuantity: 0,
  });
  const [orderItem, setOrderItem] = useState({});
  const [todayTransactions, setTodayTransactions] = useState([]);

  useEffect(() => {
    const newCustomerResponse = apiUser.get("/getTodayUsers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      },
    });
    newCustomerResponse
      .then((response) => {
        const newCustomerResponseData = response.data;

        setNewCustomers(newCustomerResponseData.length);
        console.log(
          `The length of the array is: ${newCustomerResponseData.length}`
        );
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
      });

    const newTransactionResponse = apiOrder.get("/getTodayOrders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      },
    });
    newTransactionResponse
      .then((response) => {
        const newTransactionResponseData = response.data;
        console.log(newTransactionResponseData);
        setPurchaseOrders(newTransactionResponseData.length);
        console.log(
          `The length of the new array is: ${newTransactionResponseData.length}`
        );

        let transactionList = [];
        setOrderItem({});
        for (let i = 0; i < newTransactionResponseData.length; i++) {
          const newItemKey = newTransactionResponseData[i].item.id;
          const newItemQuantity = newTransactionResponseData[i].quantity;

          if (orderItem[newItemKey]) {
            orderItem[newItemKey] += newItemQuantity;
          } else {
            orderItem[newItemKey] = newItemQuantity;
          }

          transactionList.push({
            product: newTransactionResponseData[i].item.name,
            brand: newTransactionResponseData[i].item.brand,
            count: newTransactionResponseData[i].quantity,
          });
        }
        let count = 0;
        let mostOrderItemId = 0;

        for (let key in orderItem) {
          let value = orderItem[key];
          if (count < value) {
            count = value;
            mostOrderItemId = key;
          }
          // console.log(`Item Key: ${key}, Order Quantity: ${value}`);
        }
        console.log(mostOrderItemId);
        const fetchImage = async () => {
          let listIndex = 0;
          for (let i = 0; i < newTransactionResponseData.length; i++) {
            if (newTransactionResponseData[i].item.id == mostOrderItemId) {
              listIndex = i;
              break;
            }
          }

          setMostOrderedProducts({
            productName: newTransactionResponseData[listIndex].item.name,
            productDetails: newTransactionResponseData[listIndex].item.details,
            productDiscount:
              newTransactionResponseData[listIndex].item.discount,
            productPrice: newTransactionResponseData[listIndex].item.price,
            productQuantity: orderItem[mostOrderItemId],
          });
          try {
            const response = await fetch(
              import.meta.env.VITE_REST_API_URL +
                `/image/productFileSystem/${newTransactionResponseData[listIndex].item.fileData.id}`
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);

            setImage(objectUrl);
          } catch (error) {
            console.error("Error fetching image:", error);
          }
        };

        fetchImage();
        setTodayTransactions(transactionList);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
      });
  }, []);

  return (
    <div className="admindashoard">
      <h2>Admin Dashboard</h2>
      {/* <div className="user-edit-section">
        <Link to="/user-details-or-edit-section">
          <i className="fas fa-user" style={{ fontSize: "24px" }}></i>
        </Link>
      </div> */}
      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>
            <i className="fas fa-users"></i> New Customer Registrations
          </h3>
          <p>{newCustomers}</p>
        </div>
        <div className="stat-box">
          <h3>
            <i className="fas fa-shopping-cart"></i> Purchase Orders Today
          </h3>
          <p>{purchaseOrders}</p>
        </div>
      </div>

      {/* <div className="most-ordered-products">
        <h3>Most Ordered Products</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {mostOrderedProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.product}</td>
                <td>{product.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      {todayTransactions.length !== 0 ? (
        <div className="product-card">
          <div className="product-image">
            <img src={image} alt={Image} />
          </div>
          <div className="product-details">
            <h4 className="product-name">{mostOrderedProducts.productName}</h4>
            <p className="product-price">
              Price: {mostOrderedProducts.productPrice}
            </p>
            <p className="product-details">
              Details: {mostOrderedProducts.productDetails}
            </p>
            <p className="product-discount">
              Discount: {mostOrderedProducts.productDiscount}
            </p>
            <p className="product-quantity">
              Ordered Quantity: {mostOrderedProducts.productQuantity}
            </p>
          </div>
        </div>
      ) : null}
      {todayTransactions.length !== 0 ? (
        <div className="today-transactions">
          <h3>Today's Transactions</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {todayTransactions.map((product, index) => (
                <tr key={index}>
                  <td>{product.product}</td>
                  <td>{product.brand}</td>
                  <td>{product.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default AdminDashboard;
