type fileUploaderData =
    | ["audio" | "picture" | "video", string | ArrayBuffer]
    | []

export default async function fileUploader(
    type: "audio" | "photo" | "video",
): Promise<fileUploaderData> {
    //
    if (type.toLowerCase() === "video") return Promise.resolve([])

    const hiddenFileInput = document.createElement("input")

    hiddenFileInput.setAttribute("type", "file")
    hiddenFileInput.setAttribute("accept", ACCEPTED_FILE_EXTENSIONS[type])

    return new Promise((resolve) => {
        hiddenFileInput.click()
        hiddenFileInput.addEventListener("change", ({ target }: any) => {
            //
            if (target.files && target.files[0]) {
                const file: File | undefined = target.files[0]
                const file_type = getFileType(target.files[0].type)

                if (!!file && file_type) {
                    const reader = new FileReader()
                    reader.onload = () => {
                        const encodedFile = reader.result
                        if (encodedFile) {
                            resolve([file_type, encodedFile])
                        }
                    }
                    reader.readAsDataURL(file)
                } else {
                    // TODO ---> bad file selected
                }
            } else if (target.files.length > 1) {
                // TODO ----> multiple file selected
            }
        })
        // hiddenFileInput.addEventListener("blur", () => {
        //     console.log("user close the modal")
        //     return resolve([])
        // })
    })
}

export const ACCEPTED_FILE_EXTENSIONS = {
    photo: "image/jpeg, image/jpg, image/jpeg, image/gif, image/bmp, image/webp",
    video: "video/mp4, video/webm, video/ogg",
    audio: "audio/mpeg, audio/ogg, audio/webm/ audio/wav",
}

function getFileType(type: string): "audio" | "picture" | "video" | null {
    const isPhoto = type.match(/image\//g)?.length === 1
    const isVideo = type.match(/video\//g)?.length === 1

    if (isPhoto) return "picture"
    if (isVideo) return "video"
    return null
}
