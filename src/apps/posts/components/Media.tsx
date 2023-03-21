import React from "react"
import Image from "next/image"
import { Post } from "../types/post"

type Props = {
    data: Post
}

export default function Media({ data }: Props) {
    const files = ["picture", "video", "music", "file"]

    let file: boolean = false

    for (const i of files) {
        let key = i as "picture"

        if (data[key]) {
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

function picture(data: any) {
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
