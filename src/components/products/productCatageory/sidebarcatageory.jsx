import "./sidebarCatageory.css";
import { Link } from "react-router-dom";

function SidebarCatageory() {
  return (
    <div className="side-bar-container">
      <header>Catageory</header>
      <ul className="sidebar">
        <li>
          <Link to="/Products/Vegetables/">Vegetables</Link>
        </li>
        <li>
          <Link to="/Products/Fruits">Fruits</Link>
        </li>
        <li>
          <Link to="/Products/Meats">Meats</Link>
        </li>
        <li>
          <Link to="/Products/Groceries">Groceries</Link>
        </li>
        <li>
          <Link to="/Products/Dairy&Eggs">Dairy & Eggs</Link>
        </li>
        <li>
          <Link to="/Products/FrozenFoods">Frozen Foods</Link>
        </li>
        <li>
          <Link to="/Products/Bakery">Bakery</Link>
        </li>
        <li>
          <Link to="/Products/Household&Cleaning">Household & Cleaning</Link>
        </li>
        <li>
          <Link to="/Products/Baby&ChildCare">Baby & Child Care</Link>
        </li>
        <li>
          <Link to="/Products/Health&Wellness">Health & Wellness</Link>
        </li>
        <li>
          <Link to="/Products/Seafoods">Seafoods</Link>
        </li>
        <li>
          <Link to="/Products/Beverages">Beverages</Link>
        </li>
      </ul>
    </div>
  );
}

export default SidebarCatageory;
