import { useState } from "react";
import "./orderList.css";
import OrderedItem from "./orderedItem";

function OrderList(props) {
  console.log(props.ListItems);
  function removeItemHandler(indexToRemove) {
    const updatedList = oderListItem.filter(
      (item) => item.id !== indexToRemove
    );
    setOrderListItem(updatedList);
  }
  const ListItem = props.ListItems.map((item) => (
    <div className="order-list-container" key={item.id}>
      {console.log}
      <OrderedItem data={item} closeButtonHandler={removeItemHandler} />
    </div>
  ));

  return <div className="user-order-list">{ListItem}</div>;
}

export default OrderList;
