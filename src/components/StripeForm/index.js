import React, { useState, useEffect } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import "./style.scss"
import { getOrderList } from "../../helpers/StoreOrder"

const cardStyle = {
  style: {
    base: {
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

const StripeForm = ({ onConfirmPayment, orderList, subTotal }) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState("")
  const stripe = useStripe()
  const elements = useElements()

  useEffect(async () => {
    let items = await getOrderList();
    console.log('Items =====>', items);
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4000/api/stripe/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orders: items, emailAddress: 'ernestpapyan96@gmail.com' }),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setClientSecret(data.clientSecret)
        console.log("data---->", data)
      })
  }, [])

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  const paymentSuccess = () => {
    window.location.href = "/success"
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <label>
        Card Details: <i>Required</i>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
      </label>
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {succeeded && paymentSuccess()}
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
    </form>
  )
}

export default StripeForm
