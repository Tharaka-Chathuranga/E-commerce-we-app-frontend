import "./searchBar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function SearchBar() {
  const [searchKey, setSearchKey] = useState({ key: "", catageory: "" });
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }
  function searchChangeHandler(event) {
    setSearchKey({ ...searchKey, key: event.target.value });
  }
  function selectChangeHandler(event) {
    setSearchKey({ ...searchKey, catageory: event.target.value });
  }

  return (
    <div className="search-bar-container">
      <form action="#" className="searchbar-form">
        <div className="input-text-searchbar">
          <input
            type="search"
            className="form-control-searchbar"
            style={{ width: "55%" }}
            placeholder="Search"
            onChange={searchChangeHandler}
          />
          <select
            className="catagories-select-searchbar"
            onChange={selectChangeHandler}
            value={searchKey.catageory}
          >
            <option value="" disabled hidden>
              Categories
            </option>

            <option value="Vegetable">Vegetables</option>
            <option value="Fruit">Fruits</option>
            <option value="Meat">Meats</option>
            <option value="Fish">Fish</option>
            <option value="Grocery">Grocery</option>
            <option value="Frozen">Frozen Food</option>
            <option value="Beverage">Beverages</option>
            <option value="Household">Household</option>
          </select>
          <NavLink
            className="sectiom-item-Link"
            to={{
              pathname: `/Products/${searchKey.catageory}/${searchKey.key}`,
            }}
          >
            <button className=" btn-primary-searchbar">
              <i className="fa fa-search"></i>
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
