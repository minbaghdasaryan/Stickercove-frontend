import { useHistory } from "react-router-dom"

import OrderBanner from "components/Order/OrderBanner"
import OrderOptions from "components/Order/OrderOptions"
import OrderAd from "components/Order/OrderAd"
import OrderVideo from "components/Order/OrderVideo"

import ROUTERS from "constants/Routers"

import { createOrder } from "helpers/StoreOrder"

const Order = () => {
  const history = useHistory()

  const handleNext = (title) => {
    if (title) {
      const orderId = createOrder(title)
      const route = title.toLowerCase().replaceAll(" ", "-")
      history.push(`${ROUTERS.CHOOSE_SIZE_QUANTITY}/${route}/${orderId}`)
    }
  }

  return (
    <>
      <OrderBanner />
      <OrderOptions handleNext={handleNext} />
      <OrderAd />
      <OrderVideo />
    </>
  )
}

export default Order
