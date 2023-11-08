import CarouselSection from "./carouselSection";
import "./shopCatageory.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const apiItem = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "item",
});

function ShopByCatageory() {
  const [productList, setProductList] = useState([]);
  const [vegetableList, setVegetableList] = useState([]);
  const [fruitList, setFruitList] = useState([]);
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_REST_API_URL}/item/getAllItems`;
        const responseProductList = await apiItem.get(apiUrl);

        if (responseProductList.status === 200) {
          const productListData = responseProductList.data;

          // Filter and set the product lists based on their categories
          const vegetableItems = productListData.filter(
            (item) => item.category === "Vegetable"
          );
          setVegetableList(vegetableItems);

          const fruitItems = productListData.filter(
            (item) => item.category === "Fruit"
          );
          setFruitList(fruitItems);

          const groceryItems = productListData.filter(
            (item) => item.category === "Grocery"
          );
          setGroceryList(groceryItems);

          setProductList(productListData);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(groceryList);
  return (
    <div className="shop-by-catageory-container">
      <h3 className="shop-by-catageory-title">Shopping By Category</h3>

      <CarouselSection title="Fruit" data={fruitList} />
      <CarouselSection title="Grocery" data={groceryList} />
      <CarouselSection title="Vegetable" data={vegetableList} />
    </div>
  );
}

export default ShopByCatageory;
