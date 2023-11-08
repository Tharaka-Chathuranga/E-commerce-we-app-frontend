import Header from "../components/header";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PurchaseOrderContent from "../components/purchaseOrder/purchaseOrderContent";
import "./purchaseOrderPage.css";
import axios from "axios";
import { useState, useEffect } from "react";

const apiOrder = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/order",
});

function PurchaseOrderPage() {
  const [showContent, setShowContent] = useState(false);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [orderedHistory, setOrderedHistory] = useState([]);

  const fetchData = async () => {
    try {
      const orderResponse = await apiOrder.get("/userOrders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      });

      const currentOrdersData = orderResponse.data.filter(
        (item) => item.status === "Purchased"
      );
      const orderedHistoryData = orderResponse.data.filter(
        (item) => item.status === "Delivered"
      );

      setCurrentOrders(currentOrdersData);
      setOrderedHistory(orderedHistoryData);
    } catch (error) {
      console.log("Error happening in data fetching", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function changeContent(status) {
    console.log("hi");
    setShowContent(status);
  }
  return (
    <div className="purchaseOrder-page-container">
      <Header />
      <Navbar />
      {currentOrders.length > 0 ? (
        <PurchaseOrderContent
          contentChanger={changeContent}
          content={showContent}
          currentOrders={currentOrders}
          orderedHistory={orderedHistory}
        />
      ) : (
        <p>Loading current orders...</p>
      )}
    </div>
  );
}

export default PurchaseOrderPage;
