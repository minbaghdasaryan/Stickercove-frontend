import StickerCategory from "components/StickerCategory"
import "./style.scss"

import Kisscut from "resources/images/stickers/kiss-cut-sticker.png"
import Circle from "resources/images/stickers/circle-sticker.png"
import Rectangle from "resources/images/stickers/rectangle-sticker.png"
import Square from "resources/images/stickers/square-sticker.png"
import Diecut from "resources/images/stickers/die-cut-sticker.png"
import Oval from "resources/images/stickers/oval-sticker.png"

const MainOptions = ({ handleOrder }) => (
  <div className="main-options flex flex-column">
    <p>Our Options</p>
    <div className="main-options-items flex">
      <StickerCategory
        image={Kisscut}
        title={"Kiss cut stickers"}
        comment={
          "Click above to start your order. Cut to shape with a square backing."
        }
      />
      <StickerCategory
        image={Circle}
        title={"Circle stickers"}
        comment={
          "Click above to start your order. Stickers in the shape of a circle."
        }
      />
      <StickerCategory
        image={Rectangle}
        title={"Rectangle stickers"}
        comment={
          "Click above to start your order. Cut into a rectangle shape."
        }
      />
      <StickerCategory
        image={Square}
        title={"Square stickers"}
        comment={
          "Click above to start your order. Stickers in the shape of a square."
        }
      />
      <StickerCategory
        image={Diecut}
        title={"Diecut stickers"}
        comment={
          "Click above to start your order. Both backing and sticker cut to shape."
        }
      />
      <StickerCategory
        image={Oval}
        title={"Oval stickers"}
        comment={
          "Click above to start your order. Stickers in the shape of an oval."
        }
      />
    </div>
    <div className="main-options-more">
      <div className="main-options-more-button" onClick={handleOrder}>
        VIEW MORE
      </div>
    </div>
  </div>
)

export default MainOptions
