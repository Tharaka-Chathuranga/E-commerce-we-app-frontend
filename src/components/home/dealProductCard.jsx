import React from "react";
import product_card from "./DealProductData";

function dealProductCard() {
  const DealProductList = product_card.map((DealProduct) => (
    <div className="col-md col-sm-4 col-6" key={DealProduct.id}>
      <figure className="card-product product-sm p-2">
        <a href="#" className="img-wrap p-2">
          <img src={DealProduct.imageSrc} alt={DealProduct.product_name} />
        </a>
        <div className="p-3 text-center">
          <a href="#" className="title">
            {DealProduct.product_name}
          </a>
          <span className="badge bg-danger rounded-pill">-20%</span>
        </div>
      </figure>
    </div>
  ));

  return <div class="row gx-0 bordered-cols">{DealProductList}</div>;
}

export default dealProductCard;
