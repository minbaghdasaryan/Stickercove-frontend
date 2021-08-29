import OrderAdItem from "components/Order/OrderAdItem"
import "./style.scss"

import BOX from "resources/images/vector/box.png"
import CIRCUIT from "resources/images/vector/circuit.png"
import CLOUD from "resources/images/vector/cloud.png"

const OrderAd = () => (
  <div className="order-ad flex">
    <OrderAdItem
      image={BOX}
      title={"Free shipping in 5 days"}
      comment={
        "All order including free express shipping to ensure your order arrives within 5 days."
      }
    />
    <OrderAdItem
      image={CIRCUIT}
      title={"Get an online proof"}
      comment={
        "Once your order is submited we will email out a proof before we begin production."
      }
    />
    <OrderAdItem
      image={CLOUD}
      title={"Durable and weatherproof"}
      comment={
        "Enjoy our stickers worry free with our 4+ year UV rating and water resistantice."
      }
    />
  </div>
)

export default OrderAd
