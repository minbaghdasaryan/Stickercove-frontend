import StickerAndPrices from "constants/StickerPrices"
import {
  FAST_DELIVERY,
  FASTER_DELIVERY,
  FAST_SHIPPING_FEE_SMALL,
  FAST_SHIPPING_FEE_BIG,
  FASTER_SHIPPING_FEE_SMALL,
  FASTER_SHIPPING_FEE_BIG,
} from "constants/ShippingMethods"

export const getPrice = (size, quantity) => {
  let finalPrice

  const square = size[0] * size[1] * quantity
  const price = 0.018 * square + 49

  finalPrice = price < 50 ? parseInt(price / 4) : parseInt((price * 9) / 10)
  return finalPrice
}

export const getShippingPrice = (orderList, method) => {
  let shippingFee

  if (method === FASTER_DELIVERY || method === FAST_DELIVERY) {
    let biggestSize = 0
    orderList.map((order) => {
      const square = order.size[0] * order.size[1]
      if (square > biggestSize) {
        biggestSize = square
      }
    })

    if (method === FASTER_DELIVERY) {
      shippingFee =
        biggestSize >= 25 ? FASTER_SHIPPING_FEE_BIG : FASTER_SHIPPING_FEE_SMALL
    } else {
      shippingFee =
        biggestSize >= 25 ? FAST_SHIPPING_FEE_BIG : FAST_SHIPPING_FEE_SMALL
    }
  } else {
    shippingFee = 0
  }

  return shippingFee
}
