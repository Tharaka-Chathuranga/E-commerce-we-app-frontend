import React, { useState, useEffect } from "react";
import OrderList from "./oderList";
import CurrentOrderCard from "../dataComponent/currentOrderData";
import OrderedCard from "../dataComponent/orderedData";
import "./purchaseOrderContent.css";

function PurchaseOrderContent(props) {
  const [content, setContent] = useState(props.content);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    if (content) {
      setItemList(props.currentOrders);
    } else {
      setItemList(props.orderedHistory);
    }
  }, [content, props.currentOrders, props.orderedHistory]);

  function handleTabClick(isCurrentTab) {
    setContent(isCurrentTab);
  }

  return (
    <div className="main-content-container">
      <div className="tab-links-container">
        <button
          className={`tab-links ${content ? "active" : ""}`}
          onClick={() => handleTabClick(true)}
        >
          Current Orders
        </button>
        <button
          className={`tab-links ${!content ? "active" : ""}`}
          onClick={() => handleTabClick(false)}
        >
          Delivered Order History
        </button>
      </div>
      <div className="tab-content">
        <OrderList ListItems={itemList} />
      </div>
    </div>
  );
}

export default PurchaseOrderContent;
