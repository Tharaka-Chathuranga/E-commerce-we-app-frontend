import { useState } from "react";
import CartItem from "./cartItem";

function CartList(props) {
  const cartItemList = props.itemList.map((item) => (
    <CartItem
      cartItem={item}
      closeButtonHandler={props.removeItem}
      itemsAmount={props.totalAmount}
      setItemAmount={props.setTotalAmount}
      key={item.id}
    />
  ));

  const scrollContainerStyle = {
    maxHeight: "80vh",
    overflowY: "auto",
  };

  return (
    <div className="cart-item-list-container" style={scrollContainerStyle}>
      {cartItemList}
    </div>
  );
}

export default CartList;
