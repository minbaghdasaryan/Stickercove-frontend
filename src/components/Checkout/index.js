import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import StripeForm from "components/StripeForm"
import Calender from "react-calendar"
import "./style.scss"

import {
  SCHEDULED_DELIVERY,
  SCHEDULED_DELIVERY_SELECTED,
} from "constants/ShippingMethods"
import { STRIPE_PKEY_TEST } from "configuration"

const Checkout = ({
  hasAddress = false,
  orderList,
  shippingFee,
  subTotal,
  deliveryMode,
  deliveryDate,
  shippingMethods,
  onConfirmPayment,
  handleDeliveryModeChange,
  onCalendarClick,
  onChooseAnotherDate,
  onChangeHandler,
  validated,
  getDeliveryDayFromMethod,
  getShippingPrice,
}) => {
  const stripePromise = loadStripe(STRIPE_PKEY_TEST)

  const onKeyUp = (e) => {
    const value = e.target.value
    e.target.value = value.replace(/^(\d{3})(\d{3})(\d+)$/, "+1 ($1) $2-$3")
  }

  const generateOrderList = () =>
    orderList.map((order, index) => (
      <div key={index} className="checkout-sum-orders-item flex">
        <div className="checkout-sum-orders-item-type">
          <span>{order.type}</span> <br /> {`Qty: ${order.quantity}`}
        </div>
        <div className="checkout-sum-orders-item-price">
          {`$${order.price}`}
        </div>
      </div>
    ))

  const generateShippingMethods = () =>
    shippingMethods.map((method, index) => (
      <div
        key={index}
        className="checkout-contents-delivery-dates-item flex"
        onChange={() =>
          handleDeliveryModeChange(method, getDeliveryDayFromMethod(method))
        }
      >
        <label className="custom-radio">
          <div className="flex flex-column">
            {method !== SCHEDULED_DELIVERY
              ? getDeliveryDayFromMethod(method)
              : deliveryMode === SCHEDULED_DELIVERY_SELECTED && deliveryDate
              ? deliveryDate
              : "Choose a date"}
            <span>{`${method} delivery`}</span>
            {method === SCHEDULED_DELIVERY &&
              deliveryMode === SCHEDULED_DELIVERY_SELECTED &&
              deliveryDate && (
                <div onClick={() => onChooseAnotherDate()}>
                  Choose another date
                </div>
              )}
          </div>
          <input
            type="radio"
            name="dates"
            checked={(() => {
              console.log(method)
              if (method === SCHEDULED_DELIVERY) {
                return (
                  deliveryMode === SCHEDULED_DELIVERY ||
                  deliveryMode === SCHEDULED_DELIVERY_SELECTED
                )
              } else {
                return deliveryMode === method
              }
            })()}
          />
          <span className="checkmark"></span>
        </label>
        <div className="checkout-contents-delivery-dates-item-service">
          {getShippingPrice(orderList, method)
            ? `+$${getShippingPrice(orderList, method)}`
            : "Free"}
        </div>
      </div>
    ))

  return (
    <div className="checkout">
      Checkout
      <div className="checkout-wrap flex">
        <div className="checkout-contents flex flex-column">
          <div className="checkout-contents-contact">
            Contact Information
            <div
              className={`checkout-contents-contact-email input-field ${
                !validated.phone && "required"
              }`}
            >
              Phone Number: <i>Required</i> <br />
              <input
                type="text"
                name="phone-number"
                required
                placeholder="+1 (555) 555-5555"
                onChange={onChangeHandler}
                onKeyUp={onKeyUp}
                maxLength={17}
              />
            </div>
            <div
              className={`checkout-contents-contact-email input-field ${
                !validated.phone && "required"
              }`}
            >
              Email Address: <i>Required</i> <br />
              <input
                type="text"
                name="email-address"
                required
                placeholder="your@email.com"
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className="checkout-contents-shipping">
            Shipping Information
            <div
              className={`checkout-contents-shipping-firstname input-field ${
                !validated.shFirst && "required"
              }`}
            >
              First Name: <i>Required</i> <br />
              <input
                type="text"
                name="shipping-firstname"
                required
                placeholder="Leon"
                onChange={onChangeHandler}
              />
            </div>
            <div
              className={`checkout-contents-shipping-lastname input-field ${
                !validated.shLast && "required"
              }`}
            >
              Last Name: <i>Required</i> <br />
              <input
                type="text"
                name="shipping-lastname"
                required
                placeholder="Kennedy"
                onChange={onChangeHandler}
              />
            </div>
            <div className="checkout-contents-shipping-company input-field">
              Company: <i>Optional</i> <br />
              <input
                type="text"
                name="shipping-company"
                placeholder="Delta Force"
                onChange={onChangeHandler}
              />
            </div>
            <div className="checkout-contents-shipping-street input-field">
              Street Address: <i>Required</i> <br />
              <div
                className={`flex flex-column ${
                  !validated.shStreetOne && "required"
                }`}
              >
                <input
                  type="text"
                  name="shipping-street-one"
                  required
                  placeholder="Anti Zombie Street"
                  onChange={onChangeHandler}
                />
                <input
                  type="text"
                  name="shipping-street-two"
                  required
                  placeholder="Street Line 2"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="checkout-contents-shipping-city input-field">
              City & State/Province: <i>Required</i> <br />
              <div
                className={`flex flex-column ${
                  !validated.shCity && !validated.shState && "required"
                }`}
              >
                <input
                  type="text"
                  name="shipping-city"
                  required
                  placeholder="Raccoon City"
                  onChange={onChangeHandler}
                />
                <input
                  type="text"
                  name="shipping-state"
                  required
                  placeholder="Somewhere in the world"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div
              className={`checkout-contents-shipping-zipcode input-field ${
                !validated.shZip && "required"
              }`}
            >
              ZIP code: <i>Required</i> <br />
              <input
                type="number"
                name="shipping-zip"
                required
                placeholder="52525"
                max={999999999}
                maxLength={9}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className="checkout-contents-delivery">
            Delivery Date
            <div className="checkout-contents-delivery-comment">
              {hasAddress
                ? "Delivery dates assume approval within 24 hours"
                : "Enter your shipping information to see possible delivery dates"}
            </div>
            <div className="checkout-contents-delivery-dates flex flex-column">
              {generateShippingMethods()}
            </div>
            {deliveryMode === SCHEDULED_DELIVERY && (
              <Calender
                className="checkout-contents-delivery-dates-calendar"
                onChange={onCalendarClick}
                calendarType={"US"}
                tileDisabled={(activeStartDate, date, view) => {
                  const today = new Date()
                  const day = new Date(activeStartDate.date)
                  const minStart = new Date(today)
                  minStart.setDate(today.getDate() + 6)

                  let disable = false
                  if (
                    (day.getDate() < minStart.getDate() &&
                      day.getMonth() <= minStart.getMonth() &&
                      day.getFullYear() <= minStart.getFullYear()) ||
                    (day.getMonth() < minStart.getMonth() &&
                      day.getFullYear() <= minStart.getFullYear())
                  ) {
                    disable = true
                  }

                  return disable
                }}
              />
            )}
          </div>
        </div>
        <div className="checkout-sum flex flex-column">
          <div className="flex flex-column">
            Order Summary
            <div className="checkout-sum-orders flex flex-column">
              {generateOrderList(orderList)}
              <div className="checkout-sum-orders-item flex">
                <div className="checkout-sum-orders-item-type">
                  <span>Shipping Fee</span>
                </div>
                <div className="checkout-sum-orders-item-price">
                  {`$${shippingFee}`}
                </div>
              </div>
            </div>
            <div className="checkout-sum-total flex">
              Total
              <span>{`$${subTotal}`}</span>
            </div>
          </div>

          <div className="checkout-stripe flex flex-column">
            Billing Infomation
            <span>You will not be charged until proof of approval</span>
            <div className="checkout-stripe-street input-field">
              Street Address: <i>Required</i> <br />
              <div
                className={`flex flex-column ${
                  !validated.biStreetOne && "required"
                }`}
              >
                <input
                  type="text"
                  name="billing-street-one"
                  required
                  placeholder="Anti Zombie Street"
                  onChange={onChangeHandler}
                />
                <input
                  type="text"
                  name="billing-street-two"
                  required
                  placeholder="Street Line 2"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="checkout-stripe-city input-field">
              City & State/Province: <i>Required</i> <br />
              <div
                className={`flex flex-column ${
                  !validated.biCity && !validated.biState && "required"
                }`}
              >
                <input
                  type="text"
                  name="billing-city"
                  required
                  placeholder="Raccoon City"
                  onChange={onChangeHandler}
                />
                <input
                  type="text"
                  name="billing-state"
                  required
                  placeholder="Somewhere in the world"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <Elements stripe={stripePromise}>
              <StripeForm onConfirmPayment={onConfirmPayment}/>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
