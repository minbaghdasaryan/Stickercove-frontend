import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import CheckoutComponent from "components/Checkout"

import { orderStateSelector } from "redux/Selectors"
import {
  createOrderAction,
  stripePayAction,
  getIndentAction,
} from "redux/Reducers/Order"

import ROUTERS from "constants/Routers"

import shippingMethods, {
  STANDARD_DELIVERY,
  SCHEDULED_DELIVERY,
  SCHEDULED_DELIVERY_SELECTED,
} from "constants/ShippingMethods"
import { getDateTimeFormat } from "helpers/DateTimeHelper"
import { getOrderList } from "helpers/StoreOrder"
import { getDeliveryDayFromMethod } from "helpers/Shipping"
import { getShippingPrice } from "helpers/Sticker"

const Checkout = ({ createOrderAction }) => {
  const [orderList, setOrderList] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [shFirstName, setShFirstName] = useState("")
  const [shLastName, setShLastName] = useState("")
  const [shCompany, setShCompany] = useState("")
  const [shStreetOne, setShStreetOne] = useState("")
  const [shStreetTwo, setShStreetTwo] = useState("")
  const [shCity, setShCity] = useState("")
  const [shState, setShState] = useState("")
  const [shZip, setShZip] = useState("")
  const [deliveryDate, setDeliveryDate] = useState(
    getDeliveryDayFromMethod(STANDARD_DELIVERY)
  )
  const [deliveryMode, setDeliveryMode] = useState(STANDARD_DELIVERY)
  const [shippingFee, setShippingFee] = useState(0)
  const [biStreetOne, setBiStreetOne] = useState("")
  const [biStreetTwo, setBiStreetTwo] = useState("")
  const [biCity, setBiCity] = useState("")
  const [biState, setBiState] = useState("")
  const [validated, setValidated] = useState({
    phone: false,
    email: false,
    shFirst: false,
    shLast: false,
    shStreetOne: false,
    shCity: false,
    shState: false,
    shZip: false,
    biStreetOne: false,
    biCity: false,
    biState: false,
  })
  const history = useHistory()

  useEffect(() => {
    const orderList = getOrderList()
    setShippingFee(getShippingPrice(orderList, deliveryMode))

    if (orderList.length) {
      setOrderList(orderList)
    }

    let subTotal = 0
    orderList.forEach((order) => {
      subTotal += order.price
    })

    setSubTotal(subTotal + shippingFee)
  }, [deliveryMode])

  const validateValues = () => {
    let canPass = true

    if (phoneNumber) setValidated({ ...validated, phone: true })
    if (emailAddress) setValidated({ ...validated, email: true })
    if (shFirstName) setValidated({ ...validated, shFirst: true })
    if (shLastName) setValidated({ ...validated, shLast: true })
    if (shStreetOne) setValidated({ ...validated, shStreetOne: true })
    if (shCity) setValidated({ ...validated, shCity: true })
    if (shState) setValidated({ ...validated, shState: true })
    if (shZip) setValidated({ ...validated, shZip: true })
    if (biStreetOne) setValidated({ ...validated, biStreetOne: true })
    if (biCity) setValidated({ ...validated, biCity: true })
    if (biState) setValidated({ ...validated, biState: true })

    for (const key in validated) {
      if (validated[key] === false) {
        canPass = false
      }
    }

    return canPass
  }

  const onConfirmPayment = async (stripeValidator) => {
    const orderList = getOrderList()
    const requestBody = {
      orders: orderList,
      phoneNumber,
      emailAddress,
      shFirstName,
      shLastName,
      shCompany,
      shStreetOne,
      shStreetTwo,
      shCity,
      shState,
      shZip,
      biStreetOne,
      biStreetTwo,
      biCity,
      biState,
    }

    if (!validateValues(requestBody)) {
      return
    }

    const token = await stripeValidator()

    if (token === null) {
      return
    }

    createOrderAction({
      body: {
        email: emailAddress,
        phone: phoneNumber,
        firstname: shFirstName,
        lastname: shLastName,
        company: shCompany,
        streetAddress: `${shStreetOne}, ${shStreetTwo}`,
        city: shCity,
        state: shState,
        zip: shZip,
        deliveryDate,
        orders: getOrderList(),
        price: subTotal,
        label: "ONHOLD",
      },
      onSuccess: ({ data }) => {
        console.log(data.message)
        history.push(ROUTERS.SUCCESS)
      },
    })
  }

  const handleDeliveryModeChange = (mode, date) => {
    setDeliveryMode(mode)

    if (mode !== SCHEDULED_DELIVERY) {
      setDeliveryDate(date)
    }

    const orderList = getOrderList()
    setShippingFee(getShippingPrice(orderList, mode))

    console.log("Selected Delivery: ", date)
    console.log("Selected Mode: ", mode)
  }

  const onCalendarClick = (value) => {
    const selectedDate = getDateTimeFormat(value)

    setDeliveryMode(SCHEDULED_DELIVERY_SELECTED)
    setDeliveryDate(selectedDate)
    console.log("Selected Delivery: ", selectedDate)
  }

  const onChooseAnotherDate = () => {
    if (SCHEDULED_DELIVERY_SELECTED) {
      setDeliveryMode(SCHEDULED_DELIVERY)
    }
  }

  const onChangeHandler = (e) => {
    const type = e.target.name

    switch (type) {
      case "phone-number":
        setPhoneNumber(e.target.value)
        break
      case "email-address":
        setEmailAddress(e.target.value)
        break
      case "shipping-firstname":
        setShFirstName(e.target.value)
        break
      case "shipping-lastname":
        setShLastName(e.target.value)
        break
      case "shipping-company":
        setShCompany(e.target.value)
        break
      case "shipping-street-one":
        setShStreetOne(e.target.value)
        break
      case "shipping-street-two":
        setShStreetTwo(e.target.value)
        break
      case "shipping-city":
        setShCity(e.target.value)
        break
      case "shipping-state":
        setShState(e.target.value)
        break
      case "shipping-zip":
        setShZip(e.target.value)
        break
      case "billing-street-one":
        setBiStreetOne(e.target.value)
        break
      case "billing-street-two":
        setBiStreetTwo(e.target.value)
        break
      case "billing-city":
        setBiCity(e.target.value)
        break
      case "billing-state":
        setBiState(e.target.value)
        break
      default:
        break
    }

    validateValues()
  }

  return (
    <CheckoutComponent
      orderList={orderList}
      shippingFee={shippingFee}
      subTotal={subTotal}
      deliveryMode={deliveryMode}
      deliveryDate={deliveryDate}
      shippingMethods={shippingMethods}
      onConfirmPayment={onConfirmPayment}
      handleDeliveryModeChange={handleDeliveryModeChange}
      onCalendarClick={onCalendarClick}
      onChooseAnotherDate={onChooseAnotherDate}
      onChangeHandler={onChangeHandler}
      validated={validated}
      getDeliveryDayFromMethod={getDeliveryDayFromMethod}
      getShippingPrice={getShippingPrice}
    />
  )
}

const mapStateToProps = createStructuredSelector({
  orderStore: orderStateSelector,
})

const mapDispatchToProps = {
  createOrderAction,
  stripePayAction,
  getIndentAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
