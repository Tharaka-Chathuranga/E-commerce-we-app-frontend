import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Header from "../components/header";
import MainContent from "../components/products/productCatageory/mainContent";
import axios from "axios";
import "./savedItemPage.css";

const apiItem = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "item",
});

function SavedItem() {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_REST_API_URL}/item/getAllItems`;
        const responseProductList = await apiItem.get(apiUrl);
        console.log(responseProductList.data);

        const filteredItems = responseProductList.data.filter(
          (item) => item.savedByUsers.length !== 0
        );

        console.log(filteredItems);
        setItemList(filteredItems);
      } catch (error) {
        console.log("Error happening in data fetching", error);
      }
    };

    fetchData();
  }, []);

  function changeItemList(productList) {
    setItemList(productList);
  }

  return (
    <div className="product-layout-container">
      <div className="product-layout-section">
        <Header />
        <Navbar />
      </div>

      <main className="main-section">
        <MainContent CatageoryList={itemList} changeItemList={changeItemList} />
      </main>
      <Footer className="products-footer" />
    </div>
  );
}

export default SavedItem;
