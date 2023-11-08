import MainLayout from "../layout/mainlayout";
import "./home.css";
import ShopByCatageory from "../components/home/shopCatageory";
import AboutUs from "../components/home/aboutUs";
import React, { useEffect } from "react";

function Home(props) {
  console.log(props.scrollToAbout);
  useEffect(() => {
    if (props.scrollToAbout && document.getElementById("about-us-section")) {
      window.scrollTo({
        top: document.getElementById("about-us-section").offsetTop,
        behavior: "smooth",
      });
    }
  }, [props.scrollToAbout]);

  return (
    <div className="home-page">
      <MainLayout>
        <ShopByCatageory />
        <AboutUs id="about-us-section" />
      </MainLayout>
    </div>
  );
}

export default Home;
