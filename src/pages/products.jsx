import React, { useEffect, useState } from "react";
// import FruitCard from "../components/dataComponent/fruitData";
import MainContent from "../components/products/productCatageory/mainContent";
import { useParams } from "react-router-dom";
import ProductLayout from "../layout/productLayout";
import axios from "axios";

const apiItem = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "item",
});

function Products() {
  const Params = useParams();
  let itemList;

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    let categoryName = Params.catageory;

    const fetchData = async () => {
      try {
        if (categoryName == null) {
          const apiUrl = `${
            import.meta.env.VITE_REST_API_URL
          }/item/getAllItems`;

          const responseProductList = await apiItem.get(apiUrl);
          setProductList(responseProductList.data);

          console.log(responseProductList.data);
        } else {
          const apiUrl = `${
            import.meta.env.VITE_REST_API_URL
          }/item/categeory/${categoryName}`;
          const responseProductList = await apiItem.get(apiUrl);
          setProductList(responseProductList.data);
        }
      } catch (error) {
        console.log("Error happening in data fetching", error);
      }
    };

    fetchData();
  }, [Params.catageory]);

  if (Params.key === undefined) {
    itemList = productList;
  } else {
    itemList = productList.filter((item) =>
      item.name.toLowerCase().includes(Params.key.toLowerCase())
    );
  }

  console.log(itemList);
  return <ProductLayout children={<MainContent CatageoryList={itemList} />} />;
}

export default Products;
