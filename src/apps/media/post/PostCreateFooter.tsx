import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Icon from "../../../components/UI/Icon"
import { updatePostForm } from "../../../redux/create"

import * as ST from "../../../redux/types"
import fileUploader from "./uploader"

export default function PostCreateFooter({ uploader, dispatcher }: any) {
    const { form, pages } = useSelector(
        (state: ST.AppStore) => state.create.post,
    )

    const [footer, setFooter] = useState<JSX.Element | null>(null)

    useEffect(() => {
        switch (pages.current) {
            // case "CREATE":
            case "FORM":
                // case "TEXT":
                setFooter(
                    <Footer uploader={uploader} dispatcher={dispatcher} />,
                )
                break
            case "PHOTO":
                setFooter(null)
                break
            default:
                // setFooter(<FormFooter uploader={uploader} />)
                setFooter(null)
        }
        // eslint-disable-next-line
    }, [pages, form])

    return (
        <div
            className={
                "flex items-center" + footer
                    ? "border-t border-solid cs-border pt-2"
                    : ""
            }
        >
            {footer}
        </div>
    )
}

const Footer = ({ uploader, dispatcher }: any) => {
    const storeDispatch = useDispatch()

    async function uploadImage(ev: any) {
        const mediaType = ev.currentTarget.dataset.file
        const [fileType, file] = await fileUploader(mediaType)

        if (fileType) {
            storeDispatch(
                updatePostForm({
                    media: {
                        [fileType]: {
                            url: file,
                        },
                    },
                }),
            )
            dispatcher("PHOTO")
        }
    }

    return (
        <>
            <button
                className=""
                title="Image"
                data-file="photo"
                onClick={uploadImage}
                data-accepts="image/jpeg"
            >
                <Icon name={"create"} />
            </button>
            <button
                className="icon-wrapper cursor-pointer ml-2"
                data-file="video"
                onClick={uploader}
                title="Video"
            >
                <Icon name={"video"} />
            </button>
            <button className="icon-wrapper cursor-pointer ml-2" title="Events">
                <Icon name={"calender"} />
            </button>
            <button
                className="icon-wrapper cursor-pointer ml-2"
                title="Article"
            >
                <svg
                    className="_red-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <path d="M0 32C0 14.33 14.33 0 32 0H160C177.7 0 192 14.33 192 32V416C192 469 149 512 96 512C42.98 512 0 469 0 416V32zM128 64H64V128H128V64zM64 256H128V192H64V256zM96 440C109.3 440 120 429.3 120 416C120 402.7 109.3 392 96 392C82.75 392 72 402.7 72 416C72 429.3 82.75 440 96 440zM224 416V154L299.4 78.63C311.9 66.13 332.2 66.13 344.7 78.63L435.2 169.1C447.7 181.6 447.7 201.9 435.2 214.4L223.6 425.9C223.9 422.7 224 419.3 224 416V416zM374.8 320H480C497.7 320 512 334.3 512 352V480C512 497.7 497.7 512 480 512H182.8L374.8 320z" />
                </svg>
            </button>
            <button className="pl-1">Attach a file</button>
        </>
    )
}
