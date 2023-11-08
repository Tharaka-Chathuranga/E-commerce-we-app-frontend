import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/homePage";
import Products from "./pages/products";
import ProductItemPage from "./pages/productItemPage";
import CartPage from "./pages/cartPage";
import PurchaseOrderPage from "./pages/purchaseOrderPage";
import MainLayout from "./layout/mainlayout";
import AboutUs from "./components/home/aboutUs";
import UserPage from "./pages/userPage";
import Login from "./components/loginPage/login";
import SignUp from "./components/signupPage/signUp";
import Sidebar from "./components/admin/sidebar";
import AdminPortal from "./pages/adminPortal";
import Discounts from "./pages/discountPage";
import SavedItem from "./pages/savedItemPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/About" element={<Home />} />
          <Route path="/AdminPortal" element={<AdminPortal />} />
          <Route path="/CreateItem" element={<Sidebar />} />
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/LoginPage" element={<Login />} />
          <Route path="/SignUpPage" element={<SignUp />} />
          <Route path="/UserPage" element={<UserPage />} />
          <Route path="/PurchaseOrder" element={<PurchaseOrderPage />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Discount" element={<Discounts />} />
          <Route path="/Products/:catageory" element={<Products />} />
          <Route path="/Products/:catageory/:key" element={<Products />} />
          <Route path="/Layout/main" element={<MainLayout />} />
          <Route path="/Carousel" element={<AboutUs />} />
          <Route path="/SavedItem" element={<SavedItem />} />
          <Route
            path="/products/Item/:itemId/:cartCount"
            element={<ProductItemPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
