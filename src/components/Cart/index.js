import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCashRegister,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons"
import "./style.scss"

const Cart = ({
  subTotal,
  orderList,
  deleteOrder,
  handleNext,
  handleContinue,
  emptyList,
}) => {
  const generateCart = () => {
    return orderList.map((order, index) => (
      <div key={index} className="cart-order-list-item flex">
        <img src={order.url} alt="image" />
        <div className="cart-order-list-item-type flex flex-column">
          {order.type} <br />
          {`${order.size[0]}" x ${order.size[1]}"`}
        </div>
        <div className="cart-order-list-item-quantity">{order.quantity}</div>
        <div className="cart-order-list-item-total">{`$${order.price}`}</div>
        <FontAwesomeIcon
          icon={faWindowClose}
          onClick={() => deleteOrder(order)}
        />
      </div>
    ))
  }

  return (
    <div className="cart">
      Cart
      <div className="cart-wrap flex">
        <div className="cart-order-list flex flex-column">
          {generateCart()}
          {emptyList && subTotal === 0 ? (
            <div className="cart-order-list-empty flex">
              You have empty list
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="cart-checkout flex flex-column">
          <div className="flex flex-column">
            <div className="cart-checkout-total">SubTotal: ${subTotal}</div>
            <div className="cart-checkout-button flex" onClick={handleNext}>
              Checkout
              <FontAwesomeIcon icon={faCashRegister} />
            </div>
            or <span onClick={handleContinue}>Continue shopping</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
