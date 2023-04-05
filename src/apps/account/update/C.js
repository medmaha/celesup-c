import React, { useState, useRef, useCallback, useEffect } from "react"

const Cropper = ({ width = 170, height = 170 }) => {
    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedImage, setCroppedImage] = useState(null)
    const [croppedWidth, setCroppedWidth] = useState(null)
    const [croppedHeight, setCroppedHeight] = useState(null)

    const inputFile = useRef(null)
    const imageRef = useRef(null)

    const onFileChange = useCallback((event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                setImage(reader.result)
            }
        }
    }, [])

    const handleCrop = useCallback(() => {
        const canvas = document.createElement("canvas")
        const imageElement = imageRef.current

        canvas.width = 20
        canvas.height = 20

        const ctx = canvas.getContext("2d")

        console.log(width + crop.x)

        ctx.drawImage(imageElement, 20, 20, 20, 20)
        setCroppedImage(canvas.toDataURL("image/jpeg"))
    }, [crop.x, crop.y, width, height])

    useEffect(() => {
        if (imageRef.current) {
            setCroppedWidth(imageRef.current.naturalWidth)
            setCroppedHeight(imageRef.current.naturalHeight)
        }
    }, [image])

    return (
        <div className="w-full h-full ">
            <input type="file" ref={inputFile} onChange={onFileChange} />
            {image && (
                <>
                    <div className="w-full h-full flex justify-center items-center max-h-[550px] max-w-[550px] mx-auto overflow-hidden">
                        {croppedImage && <img src={image} alt="uploaded" />}
                        <div className="w-max h-max relative overflow-hidden">
                            <img
                                ref={imageRef}
                                className="w-auto h-auto max-h-[500px] max-w-[500px]"
                                src={image}
                                alt="cropped"
                                onLoad={(e) => {
                                    setCroppedWidth(e.target.width)
                                    setCroppedHeight(e.target.height)
                                }}
                            />
                            <div
                                className="rounded-full absolute z-30 cs-border border-[2px"
                                style={{
                                    boxShadow: "0 0 15px 0 rgba(0,0,0.5)",
                                    left: `${-crop.x}px`,
                                    top: `${crop.y}px`,
                                    width: `${width}px`,
                                    height: `${height}px`,
                                    cursor: "move",
                                }}
                                onMouseDown={(e) => {
                                    e.preventDefault()
                                    const startX = e.clientX
                                    const startY = e.clientY
                                    const startCropX = crop.x
                                    const startCropY = crop.y
                                    const onMouseMove = (e) => {
                                        e.preventDefault()
                                        const diffX = e.clientX - startX
                                        const diffY = e.clientY - startY
                                        setCrop({
                                            x: startCropX + diffX,
                                            y: startCropY + diffY,
                                        })
                                    }
                                    const onMouseUp = () => {
                                        document.removeEventListener(
                                            "mousemove",
                                            onMouseMove,
                                        )
                                        document.removeEventListener(
                                            "mouseup",
                                            onMouseUp,
                                        )
                                    }
                                    document.addEventListener(
                                        "mousemove",
                                        onMouseMove,
                                    )
                                    document.addEventListener(
                                        "mouseup",
                                        onMouseUp,
                                    )
                                }}
                            ></div>
                        </div>
                    </div>
                    <button type="button" onClick={handleCrop}>
                        Crop Image
                    </button>
                    <br />
                    <button type="button" onClick={() => setCroppedImage(null)}>
                        Clear crop
                    </button>
                </>
            )}
        </div>
    )
}

export default Cropper
