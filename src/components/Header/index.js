import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { createRipples } from "react-ripples"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import LOGO from "resources/images/logo/logo.png"
import "./style.scss"

import ROUTERS from "constants/Routers"

const Ripples = createRipples({
  during: 1500,
})

const Header = () => {
  const [collapsed, setCollapsed] = useState(false)

  const history = useHistory()

  const handleClickLogo = () => {
    history.push(ROUTERS.HOME)
  }

  const handleOrder = () => {
    history.push(ROUTERS.CUSTOM_STICKER)
  }

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="header flex">
      <img src={LOGO} alt="logo" onClick={handleClickLogo} />
      <div className="header-nav  flex">
        <div className={`header-menus flex`}>
          <Ripples>
            <Link to={ROUTERS.HOME}>HOME</Link>
          </Ripples>
          <Ripples>
            <Link to={"/faq"}>FAQ</Link>
          </Ripples>
          <Ripples>
            <Link to={"/status"}>STATUS</Link>
          </Ripples>
          <Ripples>
            <Link to={"/help"}>HELP</Link>
          </Ripples>
        </div>
        <div className="header-order-now" onClick={handleOrder}>
          ORDER NOW
        </div>
        <div className="header-order-collapse">
          <FontAwesomeIcon icon={faBars} onClick={handleCollapse} />
          {collapsed && (
            <div className="header-order-collapse-menu flex flex-column">
              <div className="header-order-collapse-menu-close flex">
                <div>
                  <FontAwesomeIcon icon={faTimes} onClick={handleCollapse} />
                </div>
              </div>
              <Ripples>
                <Link to={ROUTERS.HOME}>HOME</Link>
              </Ripples>
              <Ripples>
                <Link to={"/faq"}>FAQ</Link>
              </Ripples>
              <Ripples>
                <Link to={"/status"}>STATUS</Link>
              </Ripples>
              <Ripples>
                <Link to={"/help"}>HELP</Link>
              </Ripples>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
