import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
import SizeQuantities from "constants/SizeQuantity"
import "./style.scss"

const { PopularSizes, PopularQuantities } = SizeQuantities

const SizeQuantity = ({
  type,
  size,
  quantity,
  getPrice,
  handleChange,
  handleNext,
}) => {
  const getPriseOfSize = (size, quantity) => {
    const price = getPrice(size, quantity)

    return price
  }

  const onQuantityKeyUp = (e) => {
    if (e.target.value > 10000) {
      e.target.value = 10000
    } else if (e.target.value < 10) {
      e.target.value = 10
    }
  }

  const onSizeKeyUp = (e) => {
    if (e.target.value > 11) {
      e.target.value = 10
    } else if (e.target.value < 0.5) {
      e.target.value = 0.5
    }
  }

  const generateSize = (pSizes) =>
    pSizes.map((pSize, index) => (
      <div className="size-quantity-card-select-size-popular-item flex">
        <label
          className="custom-radio"
          onClick={(e) => handleChange(e, [pSize[0], pSize[1]])}
        >
          {`${pSize[0].toString()}" x ${pSize[1].toString()}"`}
          <input
            key={index}
            type="radio"
            name="size"
            id={`size-${pSize[0].toString()}-${pSize[1].toString()}`}
            checked={pSize[0] === size[0] && pSize[1] === size[1]}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    ))

  const generateQuantity = (pQuantities) =>
    pQuantities.map((pQuantity, index) => (
      <div className="size-quantity-card-select-size-popular-item flex">
        <label
          className="custom-radio"
          onClick={(e) =>
            handleChange(e, getPriseOfSize(size, pQuantity), pQuantity)
          }
        >
          {`${pQuantity.toString()} $${getPriseOfSize(size, pQuantity)}`}
          <input
            key={index}
            type="radio"
            name="quantity"
            id={`quantity-${pQuantity.toString()}`}
            checked={pQuantity === quantity}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    ))

  return (
    <div className="size-quantity flex">
      <div className="size-quantity-card flex">
        <div className="size-quantity-card-title flex flex-column">
          <p>Choose Size & Quantity</p>
          <div>
            Type
            <br />
            ---------
            <br /> {type}
          </div>
        </div>
        <div className="size-quantity-card-select flex">
          <div className="size-quantity-card-select-size flex flex-column">
            <div className="size-quantity-card-select-size-custom flex flex-column">
              <p className="size-quantity-title">Choose Custom Size</p>
              <div className="size-quantity-card-select-size-custom-wrap flex">
                <input
                  name="customWidth"
                  type="number"
                  placeholder="width"
                  max={10}
                  min={1}
                  onChange={(e) => handleChange(e, 0, 0)}
                  onKeyUp={onSizeKeyUp}
                />
                {'"'}
                <span>x</span>
                <input
                  name="customHeight"
                  type="number"
                  placeholder="height"
                  max={10}
                  min={1}
                  onChange={(e) => handleChange(e, 0, 0)}
                  onKeyUp={onSizeKeyUp}
                />
                {'"'}
              </div>
            </div>
            <div className="size-quantity-card-select-size-popular flex flex-column">
              <p className="size-quantity-title">Popular Sizes</p>
              {generateSize(PopularSizes)}
            </div>
          </div>
          <div className="size-quantity-card-select-quantity flex flex-column">
            <div className="size-quantity-card-select-quantity-custom flex flex-column">
              <p className="size-quantity-title">Choose Custom Quantity</p>
              <input
                name="customQuantity"
                type="number"
                placeholder="Enter quantity"
                onChange={(e) => handleChange(e, 0, 0)}
                min="10"
                onKeyUp={onQuantityKeyUp}
              />
            </div>
            <div className="size-quantity-card-select-quantity-popular flex flex-column">
              <p className="size-quantity-title">Popular Quantity</p>
              {generateQuantity(PopularQuantities)}
            </div>
            <div className="size-quantity-card-next flex" onClick={handleNext}>
              Next
              <FontAwesomeIcon icon={faChevronCircleRight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SizeQuantity
