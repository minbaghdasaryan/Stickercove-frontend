import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
import "./style.scss"

const UploadSticker = ({
  children,
  url,
  instruction,
  onChange,
  handleNext,
}) => {
  console.log(instruction)
  return (
    <div className="upload-sticker flex flex-column">
      Upload your own sticker
      <div className="upload-sticker-upload flex">
        {children}
        <div className="upload-sticker-upload-instruction flex flex-column">
          <textarea
            name="sticker instruction"
            id="sticker-instruction"
            rows={4}
            placeholder="Let us know if you have any instructions to prepare your proof"
            onChange={onChange}
            defaultValue={instruction}
          ></textarea>
          <div className="upload-sticker-upload-choice flex">
            <div
              className="upload-sticker-upload-next flex"
              onClick={url ? () => handleNext(false) : () => {}}
            >
              Next
              <FontAwesomeIcon icon={faChevronCircleRight} />
            </div>
            or,{" "}
            <div
              className="upload-sticker-upload-skip flex"
              onClick={() => handleNext(true)}
            >
              Skip this step & <br /> email artwork later.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadSticker
