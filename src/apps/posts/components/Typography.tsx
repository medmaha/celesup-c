import React from "react"

export default function Typography({ data }) {
    const texts = ["caption", "excerpt", "hashtags"]
    let text: boolean
    for (const i of texts) {
        if (data[i]) {
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
                <p className="prose flex gap-3 tracking-wide text-[18px] text-primary cursor-pointer">
                    <span>#{data.hashtags.replace("#", "")}</span>
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
