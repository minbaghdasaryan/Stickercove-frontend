import "./style.scss"

const MainProcessSteps = ({ image, title, comment }) => (
  <div className="main-process-steps flex flex-column">
    <div className="main-process-steps-image flex">
      <img src={image} alt="steps" />
    </div>
    <div className="main-process-steps-title">{title}</div>
    <div className="main-process-steps-comments">{comment}</div>
  </div>
)

export default MainProcessSteps
