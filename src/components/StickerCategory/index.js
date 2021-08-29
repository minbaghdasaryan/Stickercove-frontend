import "./style.scss"

import BACKGROUND from "resources/images/stickers/sticker-bg.png"
import TITLEBG from "resources/images/stickers/stiker-title-bar.png"

const StickerCategory = ({ image, title, comment }) => (
  <div className="sticker-category flex flex-column">
    <div className="sticker-category-image flex">
      <img className="sticker-category-image-type" src={image} alt="option" />
      <img
        className="sticker-category-image-bg"
        src={BACKGROUND}
        alt="option"
      />
    </div>
    <div className="sticker-category-title flex">
      <img src={TITLEBG} alt="sticker-title-bg" />
      <span>{title}</span>
    </div>
    <div className="sticker-category-comment">{comment}</div>
  </div>
)

export default StickerCategory
