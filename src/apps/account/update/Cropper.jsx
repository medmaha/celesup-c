import React, { useState, useCallback } from "react"
import Cropper from "react-easy-crop"

export default function CropperImage() {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [image, setImage] = useState(null)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])

    const onFileChange = useCallback((event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                setImage(reader.result)
            }
        }
    }, [])

    return (
        <div className="App">
            <input type="file" onChange={onFileChange} />

            {image && (
                <>
                    <div className="crop-container">
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            cropSize={{ width: 170, height: 170 }}
                            cropShape="round"
                            // style={{ borderRadius: "9999px" }}
                            aspect={(1, 1)}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className="controls">
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => {
                                setZoom(e.target.value)
                            }}
                            className="zoom-range"
                        />
                    </div>
                </>
            )}
        </div>
    )
}
