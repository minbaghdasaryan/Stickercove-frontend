import "./style.scss"
import MAINBANNERSTICKER from "resources/images/main-banner-stickers.png"
import MAINBANNERTEXTBG from "resources/images/main-banner-textbg.png"

const MainBanner = ({ handleOrder }) => (
  <div className="main-banner flex">
    <div className="main-banner-texts flex flex-column">
      <div className="main-banner-title flex">
        <div className="flex">
          Custom Stickers <br /> that kick ass
        </div>
        <img src={MAINBANNERTEXTBG} alt="banner text bg" />
      </div>
      <div className="main-banner-comments">
        Order today and get free delivery within 5 days!
        <br /> No artwork? No problem, our designers can help! <br /> Whatever
        looks best
      </div>
      <div className="main-banner-order flex">
        <div className="main-banner-order-button" onClick={handleOrder}>
          ORDER NOW
        </div>
      </div>
    </div>
    <img src={MAINBANNERSTICKER} alt="main banner" />
  </div>
)

export default MainBanner
