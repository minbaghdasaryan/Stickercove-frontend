import OrderCard from "components/Order/OrderCard"
import "./style.scss"

import Stickers from "constants/Stickers"

const generateStickerOption = (handleNext) =>
  Stickers.map((sticker, index) => (
    <OrderCard
      key={index}
      image={sticker.image}
      title={sticker.title}
      comment={
        "Click here to start your order!"
      }
      handleNext={handleNext}
    />
  ))

const OrderOptions = ({ handleNext }) => (
  <div className="order-options flex">{generateStickerOption(handleNext)}</div>
)

export default OrderOptions
