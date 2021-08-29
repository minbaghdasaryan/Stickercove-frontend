import { Link } from "react-router-dom"
import { createRipples } from "react-ripples"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./style.scss"

const Ripples = createRipples({
  during: 1500,
})

const FontButton = ({ to, icon }) => (
  <div className="font-button-wrapper flex">
    <Ripples>
      <div className="font-button flex">
        <FontAwesomeIcon icon={icon} />
      </div>
    </Ripples>
  </div>
)

export default FontButton
