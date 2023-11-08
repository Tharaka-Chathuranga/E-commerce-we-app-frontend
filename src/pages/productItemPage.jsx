import React from "react";
import ProductItem from "../components/products/productItem/ProductItem";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Header from "../components/header";

function ProductItemPage() {
  return (
    <div className="product-page-container">
      <Header />
      <Navbar />
      <ProductItem />
      <Footer />
    </div>
  );
}

export default ProductItemPage;
