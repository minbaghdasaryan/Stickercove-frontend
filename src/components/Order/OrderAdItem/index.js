import "./style.scss"

const OrderAdItem = ({ image, title, comment }) => (
  <div className="order-ad-item flex flex-column">
    <img src={image} alt="order ad" />
    <div className="order-ad-item-title">{title}</div>
    <div className="order-ad-item-comment">{comment}</div>
  </div>
)

export default OrderAdItem
