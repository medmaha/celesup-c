import React from "react"
import { Post } from "../types/post"
import Link from "next/link"

type Props = {
    data: Post
}

export default function Typography({ data }: Props) {
    const texts = ["caption", "excerpt", "hashtags"]
    let text: boolean = false

    for (const i in texts) {
        let key = texts[i] as "caption" | "excerpt" | "hashtags"
        if (data[key]) {
            text = true
            break
        }
    }

    if (!text) return <></>

    return (
        <>
            {data.caption && (
                <p className="tracking-wider font-normal text-[20px]">
                    {data.caption}
                </p>
            )}
            {data.hashtags && (
                <p className="prose flex gap-3 max-w-full flex-wrap">
                    {data.hashtags.split(",").map((hashtag) => {
                        return (
                            <Link
                                className="tracking-wide text-[18px] text-primary font-semibold"
                                key={hashtag}
                                href={`/discover?hashtag=${hashtag
                                    .replace("#", "")
                                    .trim()}`}
                            >
                                {hashtag}
                            </Link>
                        )
                    })}
                </p>
            )}
            {data.excerpt && (
                <p className="prose tracking-wide text-[16px] secondary-text mobile:inline-block flex flex-wrap">
                    {data.excerpt?.length > 100 ? (
                        <>
                            <span>{data.excerpt.substring(0, 120)} </span>

                            <small className="text-secondary text-nowrap cursor-pointer">
                                see more...
                            </small>
                        </>
                    ) : (
                        <span>{data.excerpt} </span>
                    )}
                </p>
            )}
        </>
    )
}
