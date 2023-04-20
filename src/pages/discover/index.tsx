import { NextPageContext } from "next"
import { useRouter } from "next/router"
import React, { useLayoutEffect, useState } from "react"
import { celesupBackendApi } from "../../axiosInstance"
import Loading from "../../components/UI/Loading"
import { PostList } from "../../apps/posts/types/post"
import PostContainer from "../../apps/posts"
import { getQueryParamsFromUrl } from "../../../utils/getQueryParamFromUrl"

function init(): PostList {
    return {
        objects_count: 0,
        page_index: 0,
        page_size: 0,
        page_count: 0,
        links: {
            next: null,
            prev: null,
        },
        data: [],
    }
}

type Props = {
    keywords: { hashtag: string }
}

export default function Discover({ keywords: initKeywords }: Props) {
    const [loaded, setLoaded] = useState(false)
    const [pendingData, togglePending] = useState(false)
    const [discover, setDiscovers] = useState(init())
    const [keywords, setKeywords] = useState(initKeywords)
    const router = useRouter()

    useLayoutEffect(() => {
        if (!localStorage.getItem("ata")) router.replace("/auth/login")
        else {
            setLoaded(true)
            togglePending(true)
        }
    }, [])
    useLayoutEffect(() => {
        async function call() {
            try {
                const { data } = await celesupBackendApi.get(`/discover`)
                togglePending(false)
                setDiscovers(data)
            } catch (error: any) {
                console.log(error.message)
            }
        }
        call()
    }, [])

    if (!loaded) return <></>

    return (
        <>
            {/* <div className="flex flex-col justify-center items-center w-full mt-2"> */}
            {/* <h1 className="mt-2 text-center text-2xl font-bold tracking-wide">
                    Under Development
                </h1>
                <p className="mt-2 text-center">
                    This explore page is currently under development
                </p> 
                    <button className="m-1 text-primary">source code</button>
                */}
            {/* </div> */}
            {pendingData && (
                <div className="absolute-top 0 left-0 w-full h-full">
                    <div className="flex w-full h-full pt-[200px] justify-center">
                        <Loading text={null} loader="spinner" />
                    </div>
                </div>
            )}

            {discover.page_index > 0 && (
                <>
                    {keywords.hashtag && (
                        <div className="max-w-[700px] px-1 sm:px-2 mx-auto mt-6 mb-4">
                            <p className="px-1 sm:px-2 md:px-4 text-secondary font-semibold text-xl sm:text-2xl md:text-3xl tracking-wide">
                                #{keywords.hashtag}
                            </p>
                            <span className="cs-divider"></span>
                        </div>
                    )}
                    <PostContainer data={discover} dataSrc="/discover" />
                </>
            )}
        </>
    )
}

export async function getServerSideProps(ctx: NextPageContext) {
    if (ctx.req) {
        const url = ctx.req.url!

        const keywords = getQueryParamsFromUrl(url)

        if (Object.keys(keywords).length > 0)
            return {
                props: { keywords },
            }
    }
    return {
        props: { keywords: {} },
    }
}
