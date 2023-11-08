import "./CurrentOrder.css";
import Vegetable from "../../assets/intro/Vegitables.jpeg";

function CurrentOrder(props) {
  return (
    <div className="current-order-container" key={props.data.id}>
      <div className="current-order-image">
        <img src={props.data.thumb} />
      </div>
      <div className="current-order-details">
        <h3>{props.data.product_name}</h3>
        <h4>{props.data.price}</h4>
      </div>
      <div className="current-order-status">
        <h3>{props.data.status}</h3>
      </div>
      <div className="current-ordered-date">{props.data.date}</div>
    </div>
  );
}

export default CurrentOrder;
