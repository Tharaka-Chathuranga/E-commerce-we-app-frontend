import React, { useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import "./carouselSection.css";
import { NavLink } from "react-router-dom";

import Slide from "./slide";

function CarouselSection(props) {
  const [goToSlide, setGoToSlide] = useState(0);
  const offsetRadius = 1;
  const showNavigation = false;
  const configOptions = config.gentle;

  const slides = props.data
    .map((item) => ({
      key: item.id,
      content: (
        <Slide
          id={item.id}
          thumb={item.imageDataId}
          product_name={item.name}
          price={item.price}
          category={item.category}
        />
      ),
    }))
    .map((slide, index) => ({
      ...slide,
      onClick: () => setGoToSlide(index),
    }));

  return (
    <section className="carousel-section">
      <NavLink
        className="carousel-nav-link"
        to={{
          pathname: `/Products/${props.title}`,
        }}
      >
        <h2 className="carousel-title">{props.title}</h2>
      </NavLink>
      <div
        style={{ width: "80%", height: "500px", margin: "20px auto" }}
        className="carousel-container"
      >
        <Carousel
          slides={slides}
          goToSlide={goToSlide}
          offsetRadius={offsetRadius}
          showNavigation={showNavigation}
          animationConfig={configOptions}
        />
      </div>
    </section>
  );
}

export default CarouselSection;
