import React, { useState, useEffect } from "react";
import "./viewOrders.css";
import axios from "axios";
const apiOrder = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/order",
});

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        let tempOrderList = [];
        for (let i = 0; i < data.length; i++) {
          const priceString = data[i].item.price;
          const priceFloat = parseFloat(priceString.replace("Rs.", "").trim());
          const priceInt = Math.round(priceFloat);

          tempOrderList.push({
            id: data[i].id,
            productName: data[i].item.name,
            brand: data[i].item.brand,
            status: data[i].status,
            quantity: data[i].quantity,
            customerName: data[i].user.email,
            unitPrice: data[i].item.price,
            totalPrice: data[i].quantity * priceInt,
            item: data[i].item,
          });
        }
        setOrders(tempOrderList);
        setFilteredOrders(tempOrderList);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      return (
        order.status.toLowerCase().includes(searchText.toLowerCase()) ||
        order.name.toLowerCase().includes(searchText.toLowerCase()) ||
        order.brand.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredOrders(filtered);
  }, [searchText, orders]);

  const fetchOrders = async () => {
    try {
      const response = await apiOrder.get("/getAllOrders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error while fetching data:", error);
      throw error;
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleEditRow = (rowId) => {
    setEditRow(rowId);
  };

  const handleSaveStatus = async (order) => {
    const updatedOrders = orders.map((o) =>
      o.id === order.id ? { ...o, status: editedStatus } : o
    );
    const orderBodies = [];

    if (updatedOrders) {
      updatedOrders.map((item) => {
        const orderToEdit = {
          id: item.id,
          quantity: item.quantity,
          item: item.item,
          status: item.status,
        };
        orderBodies.push(orderToEdit);
        console.log(orderToEdit);
      });
    }
    console.log(orderBodies);

    try {
      const paymentOrderResponse = await apiOrder.put(
        "/changeAllStatus",
        orderBodies,
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

    setOrders(updatedOrders);
    setEditRow(null);
  };

  const handleStatusChange = (event) => {
    setEditedStatus(event.target.value);
  };

  return (
    <div className="admin-order-view">
      <div className="order-list-container">
        <h2 className="order-list-title">Order List</h2>
        <div className="order-view-search-bar">
          <input
            type="text"
            id="order-view-search"
            className="oreder-view-search-input"
            placeholder="Search by order status, item name, or brand"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <div className="order-view-table-content">
          <table className="order-table">
            <thead>
              <tr>
                <th className="order-header">Order Name</th>
                <th className="order-header">Brand</th>
                <th className="order-header order-status">Status</th>
                <th className="order-header">Customer Username</th>
                <th className="order-header">Quantity</th>
                <th className="order-header">Unit Price</th>
                <th className="order-header">Total Price</th>
                <th className="order-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index} className="order-row">
                  <td className="order-data">{order.productName}</td>
                  <td className="order-data">{order.brand}</td>
                  <td className="order-data">
                    {editRow === order.id ? (
                      <select
                        value={editedStatus}
                        onChange={handleStatusChange}
                      >
                        <option value="Purchased">Purchased</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    ) : (
                      order.status
                    )}
                  </td>
                  <td className="order-data">{order.customerName}</td>
                  <td className="order-data">{order.quantity}</td>
                  <td className="order-data">{order.unitPrice}</td>
                  <td className="order-data">{order.totalPrice}</td>
                  <td className="order-data">
                    {editRow === order.id ? (
                      <button
                        onClick={() => handleSaveStatus(order)}
                        className="order-view-edit-button"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditRow(order.id)}
                        className="order-view-edit-button"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewOrders;
