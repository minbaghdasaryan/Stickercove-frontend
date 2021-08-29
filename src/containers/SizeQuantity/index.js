import { useState, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"
import SizeQuantityComponent from "components/SizeQuantity"
import { getPrice } from "helpers/Sticker"
import { getOrder, updateOrder } from "helpers/StoreOrder"
import ROUTERS from "constants/Routers"

const SizeQuantity = () => {
  const [type, setType] = useState("")
  const [size, setSize] = useState([1, 1])
  const [customWidth, setCustomWidth] = useState(1)
  const [customHeight, setCustomHeight] = useState(1)
  const [customQuantity, setCustomQuantity] = useState(10)
  const [quantity, setQuantity] = useState(10)
  const [price, setPrice] = useState(12)
  const [orderId, setOrderId] = useState(0)

  useEffect(() => {
    const pathArray = pathname.split("/")
    const curPath = pathArray[pathArray.length - 2]
    const orderId = pathArray[pathArray.length - 1]

    setOrderId(orderId)

    const exist = getOrder(orderId)
    if (exist.toString().length) {
      if (exist.type) setType(exist.type)
      if (exist.size) setSize(exist.size)
      if (exist.quantity) setQuantity(exist.quantity * 1)
    }

    setType(curPath.replaceAll("-", " ").toUpperCase())
  }, [])

  const { pathname } = useLocation()
  const history = useHistory()

  const handleNext = () => {
    updateOrder(orderId, { size, quantity, price })
    history.push(`${ROUTERS.UPLOAD_STICKER}/${orderId}`)
  }

  const handleChange = (e, value, quantities) => {
    switch (e.target.name) {
      case "size":
        setSize(value)
        break
      case "customWidth":
        setCustomWidth(e.target.value > 11 ? 10 : e.target.value)
        setSize([e.target.value > 11 ? 10 : e.target.value, customHeight])
        setPrice(
          getPrice(
            [e.target.value > 11 ? 10 : e.target.value, customHeight],
            quantity
          )
        )
        break
      case "customHeight":
        setCustomHeight(e.target.value > 11 ? 10 : e.target.value)
        setSize([customWidth, e.target.value > 11 ? 10 : e.target.value])
        setPrice(
          getPrice(
            [customWidth, e.target.value > 11 ? 10 : e.target.value],
            quantity
          )
        )
        break
      case "customQuantity":
        setQuantity(e.target.value > 10001 ? 10000 : e.target.value)
        setPrice(
          getPrice(size, e.target.value > 10001 ? 10000 : e.target.value)
        )
        break
      case "quantity":
        setQuantity(quantities)
        setPrice(value)
        break
      default:
        break
    }
  }

  return (
    <SizeQuantityComponent
      type={type}
      size={size}
      quantity={quantity}
      getPrice={getPrice}
      handleChange={handleChange}
      handleNext={handleNext}
    />
  )
}

export default SizeQuantity
