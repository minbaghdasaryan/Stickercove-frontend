import MainProcessSteps from "components/Dashboard/MainProcessSteps"
import "./style.scss"

import ProcessSteps from "constants/ProcessSteps"

const generateSteps = () =>
  ProcessSteps.map((step, index) => (
    <MainProcessSteps
      key={index}
      image={step.image}
      title={step.title}
      comment={step.comment}
    />
  ))

const MainProcess = ({ handleOrder }) => (
  <div className="main-process">
    <p>How we do things</p>
    <div className="main-process-step flex">{generateSteps()}</div>
    <div className="main-process-order flex">
      <span className="main-process-order-button" onClick={handleOrder}>
        ORDER TODAY
      </span>
    </div>
  </div>
)

export default MainProcess
