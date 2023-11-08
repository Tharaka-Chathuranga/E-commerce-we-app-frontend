import "./payment.css";
import axios from "axios";

console.log(import.meta.env.VITE_REST_API_URL);
const apiOrder = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL + "/order",
});

function PaymentSection(props) {
  const paymentHandle = async (e) => {
    e.preventDefault();
    const orderBodies = [];

    if (props.orderList) {
      props.orderList.map((item) => {
        const orderToEdit = {
          id: item.id,
          quantity: item.quantity,
          item: item.item,
          status: "Purchased",
        };
        orderBodies.push(orderToEdit);
        console.log(orderToEdit);
      });
    }
    console.log(orderBodies);

    try {
      const paymentOrderResponse = await apiOrder.put(
        "/changeAllStatus",
        orderBodies,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      props.checkout();
    } catch (error) {
      console.log("Error happenig changing Order data", error);
    }
  };

  return (
    <div className="payment-section-container">
      <div className="card-type">
        <label htmlFor="paymentOption">Payment Option</label>
        <select id="PaymentOption" name="PaymentOption">
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </div>
      <div className="card-detail-form">
        <form onSubmit={paymentHandle}>
          <input
            className="payment-card-detail-form"
            type="text"
            id="name"
            name="cardHoulderName"
            placeholder="Cardhoulder's Name"
          />

          <input
            className="payment-card-number"
            type="number"
            id="number"
            name="cardNumber"
            placeholder="Card Number"
          />
          <div className="amount-section">
            <div id="subtotal" className="total-amount">
              <h5>Sub Total</h5>
              <h5 id="subtotal-value">{props.totalAmount}</h5>
            </div>
            <div id="delivery-charges" className="delivery-charges">
              <h5>Delivery Charges</h5>
              <h5 id="delivery-charges-value">0</h5>
            </div>
          </div>

          <input
            className="payment-submit-button"
            type="submit"
            value="Checkout"
          />
        </form>
      </div>
    </div>
  );
}

export default PaymentSection;
