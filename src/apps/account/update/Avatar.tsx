import Image from "next/image"
import { AuthUserProfile } from "../types"
import { Form } from "./types"

type Props = {
    formData: Form
    updateFormData: (data: (prev: Form) => Form) => void
}

export default function Avatar({ formData, updateFormData }: Props) {
    //
    function previewImage(
        element: HTMLElement,
        files: FileList,
        action: "cover" | "avatar",
    ) {
        const image = element
            .closest(`.${action}`)
            ?.querySelector(`img.${action}`) as HTMLImageElement

        console.log(files)

        if (!!files[0] && image) {
            // image.src = URL.createObjectURL(files[0])
            updateFormData((prev) => ({
                ...prev,
                [action]: URL.createObjectURL(files[0]),
            }))
        }
    }

    function changeProfileImage(ev: any) {
        const target = ev.currentTarget as HTMLElement

        const fileInput = document.createElement("input")
        fileInput.setAttribute("type", "file")

        switch (target.getAttribute("data-select-image")) {
            case "avatar":
                fileInput.click()
                fileInput.addEventListener("change", (ev: any) => {
                    const file = ev.target as HTMLInputElement
                    previewImage(target, file.files!, "avatar")
                })
                break
            case "cover_img":
                fileInput.click()
                fileInput.addEventListener("change", (ev: any) => {
                    const file = ev.target as HTMLInputElement
                    previewImage(target, file.files!, "avatar")
                })
                break
            case "remove":
                // fileInput.click()
                // fileInput.addEventListener("change", ({ target }) =>
                //     changeImage(target, "remove"),
                // )
                console.log("remove cover")
                break

            default:
                break
        }
    }

    return (
        <div className="w-full relative">
            <div className="cover h-max w-full relative rounded-t-md overflow-hidden">
                <img
                    className="cover h-[120px] w-full object-cover"
                    src={formData.cover}
                    alt="cover"
                />

                {/* buttons */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <div
                        className="flex gap-4 h-full w-full items-center justify-center text-lg"
                        style={{
                            backgroundColor: "rgba(0,0,0, 0.6)",
                        }}
                    >
                        {formData.cover !== "default-cover" && (
                            <button
                                className="flex justify-center items-center rounded-full transition w-[2em] h-[2em] bg-red-500 bg-opacity-30 hover:bg-opacity-50"
                                title="remove photo"
                                // onClick={changeProfileImage}
                                data-select-image="remove"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width={20}
                                    height={20}
                                >
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                            </button>
                        )}
                        <button
                            className="flex justify-center items-center rounded-full transition w-[2em] h-[2em] bg-sky-500 bg-opacity-30 hover:bg-opacity-50"
                            title="add photo"
                            // onClick={changeProfileImage}
                            data-select-image="cover"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 92 92"
                                width={20}
                                height={20}
                            >
                                <path
                                    id="XMLID_1160_"
                                    d="M46,27c-12.6,0-22.9,10.4-22.9,23.2c0,12.8,10.3,23.2,22.9,23.2s22.9-10.4,22.9-23.2
                                        C68.9,37.4,58.6,27,46,27z M46,65.5c-8.2,0-14.9-6.8-14.9-15.2S37.8,35,46,35s14.9,6.8,14.9,15.2S54.2,65.5,46,65.5z M57.1,51.2
                                        c-0.2,1.8-1.7,3-3.5,3c-0.2,0-0.3,0-0.5,0c-1.9-0.3-3.3-2-3-3.9c0.4-2.9-3-4.5-3.2-4.6c-1.7-0.8-2.5-2.9-1.7-4.6
                                        c0.8-1.7,2.8-2.5,4.6-1.8C53,40.7,58,44.7,57.1,51.2z M49.4,55.6c0.7,0.7,1.2,1.8,1.2,2.8c0,1-0.4,2.1-1.2,2.8
                                        c-0.8,0.7-1.8,1.2-2.8,1.2s-2.1-0.4-2.8-1.2c-0.7-0.8-1.2-1.8-1.2-2.8c0-1.1,0.4-2.1,1.2-2.8c0.8-0.8,1.8-1.2,2.8-1.2
                                        S48.7,54.8,49.4,55.6z M88,26H72.6l-4.3-16c-0.5-1.7-2.1-3-3.9-3H27.5c-1.8,0-3.4,1.3-3.9,3l-4.3,16H4c-2.2,0-4,1.7-4,3.9V81
                                        c0,2.2,1.8,4,4,4h84c2.2,0,4-1.8,4-4V29.9C92,27.7,90.2,26,88,26z M84,77H8V34h14.4c1.8,0,3.4-1.3,3.9-3l4.3-16h30.8l4.3,16
                                        c0.5,1.7,2.1,3,3.9,3H84V77z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* profile Image */}
            <div
                data-field="avatar"
                className="rounded-full absolute top-[60px] left-4"
            >
                <div className="avatar relative h-full rounded-full overflow-hidden">
                    <Image
                        src={formData.avatar}
                        className="avatar rounded-full"
                        alt="profile avatar"
                        width={100}
                        height={100}
                    />

                    <div
                        className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
                        style={{
                            backgroundColor: "rgba(0,0,0, 0.6)",
                        }}
                    >
                        <button
                            className="flex justify-center items-center rounded-full transition w-[2em] h-[2em] bg-sky-500 bg-opacity-30 hover:bg-opacity-50"
                            title="add photo"
                            onClick={changeProfileImage}
                            data-select-image="avatar"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 92 92"
                                width={20}
                                height={20}
                            >
                                <path
                                    id="XMLID_1160_"
                                    d="M46,27c-12.6,0-22.9,10.4-22.9,23.2c0,12.8,10.3,23.2,22.9,23.2s22.9-10.4,22.9-23.2
                                        C68.9,37.4,58.6,27,46,27z M46,65.5c-8.2,0-14.9-6.8-14.9-15.2S37.8,35,46,35s14.9,6.8,14.9,15.2S54.2,65.5,46,65.5z M57.1,51.2
                                        c-0.2,1.8-1.7,3-3.5,3c-0.2,0-0.3,0-0.5,0c-1.9-0.3-3.3-2-3-3.9c0.4-2.9-3-4.5-3.2-4.6c-1.7-0.8-2.5-2.9-1.7-4.6
                                        c0.8-1.7,2.8-2.5,4.6-1.8C53,40.7,58,44.7,57.1,51.2z M49.4,55.6c0.7,0.7,1.2,1.8,1.2,2.8c0,1-0.4,2.1-1.2,2.8
                                        c-0.8,0.7-1.8,1.2-2.8,1.2s-2.1-0.4-2.8-1.2c-0.7-0.8-1.2-1.8-1.2-2.8c0-1.1,0.4-2.1,1.2-2.8c0.8-0.8,1.8-1.2,2.8-1.2
                                        S48.7,54.8,49.4,55.6z M88,26H72.6l-4.3-16c-0.5-1.7-2.1-3-3.9-3H27.5c-1.8,0-3.4,1.3-3.9,3l-4.3,16H4c-2.2,0-4,1.7-4,3.9V81
                                        c0,2.2,1.8,4,4,4h84c2.2,0,4-1.8,4-4V29.9C92,27.7,90.2,26,88,26z M84,77H8V34h14.4c1.8,0,3.4-1.3,3.9-3l4.3-16h30.8l4.3,16
                                        c0.5,1.7,2.1,3,3.9,3H84V77z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-[30px] w-full"></div>
        </div>
    )
}
