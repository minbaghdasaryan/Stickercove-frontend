import { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import UploadStickerComponent from "components/UploadSticker"
import FileUploader from "components/FileUploader"

import { getOrder, updateOrder } from "helpers/StoreOrder"
import ROUTERS from "constants/Routers"

const UploadSticker = () => {
  const history = useHistory()
  const { pathname } = useLocation()

  const [orderId, setOrderId] = useState(0)
  const [imageUrl, setImageUrl] = useState("")
  const [instruction, setInstruction] = useState("")

  useEffect(() => {
    const pathArray = pathname.split("/")
    const orderId = pathArray[pathArray.length - 1]

    const exist = getOrder(orderId)
    if (exist.url) setImageUrl(exist.url)
    if (exist.instruction) setInstruction(exist.instruction)

    setOrderId(orderId)
  }, [])

  const handleChange = (e) => {
    setInstruction(e.target.value)
  }

  const handleNext = (isSkip = false) => {
    const res = updateOrder(orderId, {
      url: imageUrl,
      skip: isSkip,
      instruction,
    })

    if (res) {
      history.push(ROUTERS.CART)
    } else {
      alert("There is no such order. Please restart")
    }
  }

  return (
    <UploadStickerComponent
      url={imageUrl}
      instruction={instruction || ""}
      onChange={handleChange}
      handleNext={handleNext}
    >
      <FileUploader url={imageUrl} onChange={setImageUrl} />
    </UploadStickerComponent>
  )
}

export default UploadSticker
