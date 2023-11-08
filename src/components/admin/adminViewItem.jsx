import AdminSectionItem from "./adminSectionItem";
import React, { useState, useEffect } from "react";
import "./adminViewItem.css";
import axios from "axios";
import EditItem from "./editItem";

const apiItem = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "item",
});
function AdminViewItem() {
  const [editEnable, setEditEnable] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [itemIdToEdit, setItemIdToEdit] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_REST_API_URL}/item/getAllItems`;
        const responseProductList = await apiItem.get(apiUrl);
        setItemList(responseProductList.data);
      } catch (error) {
        console.log("Error happening in data fetching", error);
      }
    };

    fetchData();
  }, []);

  function changeEditEnable(data) {
    setItemIdToEdit(data.editItem);
    setEditEnable(data.editStatus);
  }
  console.log(itemList);
  const ViewItems = itemList.map((sectionItem) => (
    <div key={sectionItem.id}>
      <AdminSectionItem
        id={sectionItem.id}
        thumb={sectionItem.fileData}
        product_name={sectionItem.name}
        price={sectionItem.price}
        discount={sectionItem.discount}
        user={sectionItem.savedByUsers}
        details={sectionItem.details}
        category={sectionItem.category}
        quantity={sectionItem.quantity}
        brand={sectionItem.brand}
        changeEditEnableStatus={changeEditEnable}
      />
    </div>
  ));
  return (
    <div>
      {editEnable ? (
        <EditItem item={itemIdToEdit} changeEditEnable={changeEditEnable} />
      ) : (
        <div className="admin-section-item-container">{ViewItems}</div>
      )}
    </div>
  );
}

export default AdminViewItem;
