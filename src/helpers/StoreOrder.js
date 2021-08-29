export const createOrder = (stickerType, value = null) => {
  const orderCount = localStorage.length
  const newId = (orderCount + 1).toString()

  const newOrder =
    value && value.toString().length ? value : { type: stickerType, id: newId }

  localStorage.setItem(newId, JSON.stringify(newOrder))

  console.log("New order", newId, " has been created with ", stickerType)

  return newId
}

export const getOrder = (id) => {
  const orderById = localStorage.getItem(id)

  if (orderById) {
    const order = JSON.parse(orderById)

    return order
  }

  return {}
}

export const updateOrder = (id, value) => {
  const orderById = localStorage.getItem(id)

  if (orderById) {
    const order = JSON.parse(orderById)
    const newOrder = Object.assign(order, value)

    localStorage.setItem(id, JSON.stringify(newOrder))

    console.log("Order", id, "has been updated")
    return true
  }

  console.error("Order", id, "does not exist")
  return false
}

export const deleteOrder = (id) => {
  const orderById = localStorage.getItem(id)

  if (orderById) {
    localStorage.removeItem(id)

    console.log("Order", id, "has been deleted")
  }
}

export const getOrderList = () => {
  const orderCount = localStorage.length

  if (orderCount) {
    let orderList = []

    for (let i = 1; i <= orderCount; i++) {
      const order = JSON.parse(localStorage.getItem(i))

      orderList.push(order)
    }

    return orderList
  }

  return []
}

export const resetOrderList = (newList) => {
  localStorage.clear()

  newList.forEach((order) => {
    createOrder(null, order)
  })
}

export const filterInvalidOrder = () => {
  const orderCount = localStorage.length

  if (orderCount) {
    for (let i = 1; i <= orderCount; i++) {
      const order = JSON.parse(localStorage.getItem(i))
      if (order.price === undefined) {
        localStorage.removeItem(i)
        i = i - 1
        orderCount = orderCount - 1
      }
    }
  }
}
