import { Link } from "react-router-dom"
import "./style.scss"

import ROUTERS from "constants/Routers"

const NotFound = () => (
  <div className="not-found flex flex-column">
    404, Oops <br />
    There is no such page.
    <Link to={ROUTERS.HOME}>Go to homepage</Link>
  </div>
)

export default NotFound
