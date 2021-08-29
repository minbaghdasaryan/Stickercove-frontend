import "./style.scss"

import PLAYICON from "resources/images/play-icon.png"
import VIDEOTHUMB from "resources/images/video-thumb.png"

const OrderVideo = () => (
  <div className="order-video flex">
    <div className="order-video-thumb flex">
      <img src={VIDEOTHUMB} alt="video-thumb" />
      <div className="order-video-thumb-button flex">
        <img src={PLAYICON} alt="play-icon" />
      </div>
    </div>
    <div className="order-video-comment">
      <div className="order-video-comment-title">
        A perfect circle for your design
      </div>
      <div className="order-video-comment-content">
      All of our beautiful stickers are made with the upmost attention to detail. Order today to start your proofing process and receive free express shipping and a blazing turnaround time.
      </div>
    </div>
  </div>
)

export default OrderVideo
