import { Link, useHistory } from "react-router-dom"
import "./style.scss"

import ROUTERS from "constants/Routers"

import { TESTIMORIAL } from "constants/DummyTexts"

import LOGO from "resources/images/logo/logo.png"
import FOOTER from "resources/images/main-footer.png"

const Footer = () => {
  const history = useHistory()

  const handleOrder = () => {
    history.push(ROUTERS.CUSTOM_STICKER)
  }

  return (
    <>
      <div className="main-footer-fill"></div>
      <div className="main-footer-getapp flex">
        <img src={FOOTER} alt="get order" />
        <div className="main-footer-getapp-content flex">
          <span>GET ORDER TODAY</span>
          <div className="main-footer-getapp-order" onClick={handleOrder}>
            ORDER NOW
          </div>
        </div>
      </div>
      <div className="main-footer flex">
        <div className="main-footer-info">
          <img src={LOGO} alt="logo" />
          <br />
          <p>{TESTIMORIAL}</p>
        </div>
        <div className="main-footer-service flex flex-column">
          <span>HELPFUL LINKS</span>
          <Link to={"/terms-of-service"}>TERMS OF SERVICE</Link>
          <Link to={"/privacy-policy"}>PRIVACY POLICY</Link>
          <Link to={"/refund-policy"}>REFUND POLICY</Link>
          <Link to={"/help"}>CONTACT US</Link>
          <Link to={"/faq"}>FAQ</Link>
        </div>
        <div className="main-footer-information flex flex-column">
          <span>INFORMATION</span>
          <div>
            Looking for additional help? Contact StickerCove today.
          </div>
          <div className="main-footer-information-contacts">
            <div>
              Tel: <span>+1 864-660-4023</span>
            </div>
            <div>
              Email: <span>help@stickercove.com</span>
            </div>
            <div className="flex">
              <div>Location: </div>
              <span> 655H Fairview Rd. Ste 109 Simpsonville, SC</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
