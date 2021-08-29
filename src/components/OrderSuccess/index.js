import React, {useEffect } from "react"
import { useHistory } from "react-router"
import "./style.scss"

import ROUTERS from "constants/Routers"

const OrderSuccess = () => {

  useEffect(() => {
    window.gtag('config', 'AW-314966559');
    window.gtag('event', 'conversion', { 'send_to': 'AW-314966559/hJ14CMjQz-0CEJ-EmJYB', 'value': 1.0, 'currency': 'USD', 'transaction_id': '' });
  }, []);

  const history = useHistory()

  const handleClick = () => {
    history.push(ROUTERS.CUSTOM_STICKER)
  }

  return (
    <div className="order-success flex flex-column">
      Congratulations! <br />
      Your order has sent to the admin <br />
      You will get your stickers on August 31st
      <div onClick={handleClick}>Continue shopping</div>
    </div>
  )
}

export default OrderSuccess
