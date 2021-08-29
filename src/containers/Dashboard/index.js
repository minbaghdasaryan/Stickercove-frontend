import { useHistory } from "react-router-dom"

import MainBanner from "components/Dashboard/MainBanner"
import MainProcess from "components/Dashboard/MainProcess"
import MainOptions from "components/Dashboard/MainOptions"
import MainTestimoral from "components/Dashboard/MainTestimoral"

import ROUTERS from "constants/Routers"

const Dashboard = () => {
  const history = useHistory()

  const handleOrder = () => {
    history.push(ROUTERS.CUSTOM_STICKER)
  }

  return (
    <>
      <MainBanner handleOrder={handleOrder} />
      <MainProcess handleOrder={handleOrder} />
      <MainOptions handleOrder={handleOrder} />
      <MainTestimoral />
    </>
  )
}

export default Dashboard
