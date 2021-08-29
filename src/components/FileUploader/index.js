import { useState } from "react"
import { storage } from "configuration/Firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudUploadAlt, faSpinner } from "@fortawesome/free-solid-svg-icons"
import "./style.scss"

const FileUploader = ({ url, onChange }) => {
  const [onUploading, setOnUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [imageAsUrl, setImageAsUrl] = useState("")

  const handleFirebaseUpload = (e) => {
    setOnUploading(true)

    const image = e.target.files[0]

    if (image === "") {
      console.error("Not an allowed type")
    }

    const uploadTask = storage.ref(`/stickers/${image.name}`).put(image)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot)
      },
      (error) => {
        console.log(error)
      },
      () => {
        storage
          .ref("stickers")
          .child(image.name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            onChange(firebaseUrl)
            setImageAsUrl(firebaseUrl)
          })
        setUploaded(true)
      }
    )
    setOnUploading(false)
  }

  return (
    <div className="file-uploader">
      {!onUploading && (
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.pdf,.zip,.eps,.ai"
          onChange={handleFirebaseUpload}
        />
      )}
      <div className="file-uploader-icon flex flex-column">
        {onUploading ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="rotating" />
            <span>Uploading...</span>
          </>
        ) : uploaded || url ? (
          <>
            <img src={imageAsUrl || url} alt="thumbnail" />
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faCloudUploadAlt} />
            <span>
              Upload <br /> Sticker Image
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default FileUploader
