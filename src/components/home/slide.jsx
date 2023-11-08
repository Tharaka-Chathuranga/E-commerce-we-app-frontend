import React from "react";
import "./slide.css";

import { useState, useEffect } from "react";

function Slide(props) {
  console.log(props);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_REST_API_URL +
            `/image/productFileSystem/${props.thumb}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        setSelectedImage(objectUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [props.thumb]);

  return (
    <div className="slide-container">
      <img src={selectedImage} alt="" className="image-container" />
      <div className="text-overlay">
        <h4 className="product-name">{props.product_name}</h4>
        <h4 className="product-price">
          {" "}
          <div className="section-item-price">
            {props.price}{" "}
            {props.category === "Vegetable" || props.category === "Fruit"
              ? "Per 1Kg"
              : "Per Item"}
          </div>
        </h4>
      </div>
    </div>
  );
}
export default Slide;
