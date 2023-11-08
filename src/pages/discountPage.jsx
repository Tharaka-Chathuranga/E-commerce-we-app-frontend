import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Header from "../components/header";
import MainContent from "../components/products/productCatageory/mainContent";
import axios from "axios";
import "./discount.css";

const apiItem = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "item",
});

function Discounts() {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_REST_API_URL}/item/getAllItems`;
        const responseProductList = await apiItem.get(apiUrl);

        const filteredItems = responseProductList.data.filter((item) => item.discount.trim() !== "");
        setItemList(filteredItems);
      } catch (error) {
        console.log("Error happening in data fetching", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="discount-product-layout-container">
      <div className="discount-product-layout-section">
        <Header />
        <Navbar />
      </div>

      <main className="discount-main-section">
        <MainContent CatageoryList={itemList} />
      </main>
      <Footer className="discount-products-footer" />
    </div>
  );
}

export default Discounts;
