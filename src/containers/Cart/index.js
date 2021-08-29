import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import CartComponent from "components/Cart"

import { getOrderList, resetOrderList } from "helpers/StoreOrder"
import ROUTERS from "constants/Routers"

const Cart = () => {
  const history = useHistory()

  const [orderList, setOrderList] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [emptyList, setEmptyList] = useState(false)

  useEffect(() => {
    const orderList = getOrderList()

    if (orderList.length) {
      setOrderList(orderList)
    }

    let subTotal = 0
    orderList.forEach((order) => {
      subTotal += order.price
    })

    setSubTotal(subTotal)
  }, [])

  const handleNext = () => {
    if (subTotal) {
      history.push(ROUTERS.CHECKOOUT)
    } else {
      setEmptyList(true)
    }
  }

  const handleContinue = () => {
    history.push(ROUTERS.CUSTOM_STICKER)
  }

  const deleteOrder = (order) => {
    console.log(order)
    const newOrderList = orderList.filter(
      (orderItem, index, array) => orderItem.id !== order.id
    )

    setOrderList(newOrderList)
    resetOrderList(newOrderList)
  }

  return (
    <CartComponent
      subTotal={subTotal}
      orderList={orderList}
      deleteOrder={deleteOrder}
      handleNext={handleNext}
      handleContinue={handleContinue}
      emptyList={emptyList}
    />
  )
}

export default Cart
