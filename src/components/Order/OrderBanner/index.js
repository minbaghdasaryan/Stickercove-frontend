import "./style.scss"

import ORDERBANNER from "resources/images/order-banner.png"

const OrderBanner = () => (
  <div className="order-banner flex">
    <div className="flex">Custom Stickers</div>
    <img src={ORDERBANNER} alt="order-banner" />
  </div>
)

export default OrderBanner
