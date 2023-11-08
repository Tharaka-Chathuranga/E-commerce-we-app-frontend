import React from "react";
import useCustomTypewriter from "./useCustomTypewriter"; // Import the custom hook
import "./aboutUs.css";

function AboutUs() {
  const text1 = useCustomTypewriter(
    "Welcome to Easy Shopping - Your Trusted Grocery Shopping Destination!.",
    100
  );

  const text2 = useCustomTypewriter(
    "At SuperMarketX, we understand that your grocery shopping experience matters. That's why we've dedicated ourselves to providing you with the finest selection of fresh produce, pantry staples, and household essentials, all at your fingertips. Our commitment to quality, convenience, and affordability has made us your go-to supermarket on the web.",
    100
  );
  const text3 = useCustomTypewriter("Our Journey", 100);

  const text4 = useCustomTypewriter(
    "Our story began with a simple vision: to simplify and elevate the way you shop for groceries. Founded by a group of passionate food enthusiasts, SuperMarketX has grown from a local grocer to a digital supermarket, serving customers nationwide.",
    100
  );
  const text5 = useCustomTypewriter("Join Our SuperMarketX Family", 100);
  const text6 = useCustomTypewriter(
    "We invite you to join our growing family of satisfied customers. Discover a world of flavors, convenience, and savings with SuperMarketX. Shop with confidence and experience the future of grocery shopping.",
    100
  );
  const text7 = useCustomTypewriter(
    "Ready to get started? Explore our extensive range of products and start filling your cart today. Thank you for choosing SuperMarketX!",
    100
  );

  return (
    <div className="about-us-section">
      <div className="about-us-container">
        <h3 className="about-us-title">About Us</h3>
        <div className="typewriter-container">
          <p>{text1}</p>
          <p>{text2}</p>
          <h4>{text3}</h4>
          <p>{text4}</p>
          <h4>{text5}</h4>
          <p>{text6}</p>

          <p className="invitation">{text7}</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
