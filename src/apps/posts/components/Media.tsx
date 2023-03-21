import React from "react"
import Image from "next/image"

export default function Media({ data }) {
    const files = ["picture", "video", "music", "file"]

    let file: boolean

    for (const i of files) {
        if (data[i]) {
            file = true
            break
        }
    }

    if (!file) return <></>

    return (
        <>
            <div className="mt-4">{data.picture && picture(data)}</div>
        </>
    )
}

function picture(data) {
    return (
        <Image
            width={data.picture.width}
            // quality={}
            height={data.picture.height}
            // placeholder="blur"
            // blurDataURL="/images/logo.png"
            src={data.picture.url}
            // priority
            loading="lazy"
            alt={data.picture.alt_text}
            className="rounded-[1.2rem] outline-1 cs-outline"
        />
    )
}
