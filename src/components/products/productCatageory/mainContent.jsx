import SectionItem from "./sectionItem";
import "./mainContent.css";
import React, { useState } from "react";

function MainContent(props) {
  const [itemList, setItemList] = useState(props.CatageoryList);

  const changeItem = (itemToChange) => {
    const updatedItems = props.CatageoryList.filter(
      (item) => item.id !== itemToChange.id
    );

    setItemList(updatedItems);

    console.log(updatedItems);
    if (props.changeItemList) {
      props.changeItemList(updatedItems);
    }
  };
  console.log(props);

  const SectionItems = props.CatageoryList.map((sectionItem) => (
    <div key={sectionItem.id}>
      <SectionItem
        id={sectionItem.id}
        thumb={sectionItem.imageDataId}
        product_name={sectionItem.name}
        price={sectionItem.price}
        discount={sectionItem.discount}
        user={sectionItem.savedByUsers}
        changeItem={props.changeItem !== null ? changeItem : null}
        category={sectionItem.category}
      />
    </div>
  ));
  return <div className="section-item-container">{SectionItems}</div>;
}

export default MainContent;
