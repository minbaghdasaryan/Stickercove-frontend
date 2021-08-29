import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import {
  faLinkedinIn,
  faTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons"
import FontButton from "components/FontButton"
import "./style.scss"

const HeaderBar = () => (
  <div className="header-bar flex">
    <span>
      <span>
        <FontAwesomeIcon icon={faPhoneAlt} />
        864-660-4023
      </span>
      <span>
        <FontAwesomeIcon icon={faEnvelope} />
        help@stickercove.com
      </span>
    </span>
    <div className="flex">
      <FontButton to={"https://localhost:4000"} icon={faLinkedinIn} />
      <FontButton to={"https://localhost:4000"} icon={faTwitter} />
      <FontButton to={"https://localhost:4000"} icon={faFacebookF} />
    </div>
  </div>
)

export default HeaderBar
