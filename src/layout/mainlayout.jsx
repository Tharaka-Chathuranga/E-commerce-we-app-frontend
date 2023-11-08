import React from "react";
import Navbar from "../components/navbar";
import Header from "../components/header";
import "./mainlayout.css";
import Footer from "../components/footer";
import SearchBar from "../components/searchBar";
import backgroundImage from "../assets/layout/coverPhoto.jpg";

function MainLayout({ children }) {
  return (
    <div className="layout-container">
      <div className="main-layout-section">
        {/* <div className="header-navbar"> */}
        <Header />
        <Navbar />

        <SearchBar />
      </div>
      <main>
        {children}
        <Footer className="main-layout-footer" />
      </main>
    </div>
  );
}

export default MainLayout;
