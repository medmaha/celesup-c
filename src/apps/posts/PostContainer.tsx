import { useContext, useEffect, useRef, useState } from "react"
import { getErrorMessageFromRequest } from "../../../utils/getErrorMessageFromResponse"
import { celesupBackendApi } from "../../axiosInstance"
import Loading from "../../components/UI/Loading"
import Toast from "../../components/UI/Toast"
import { GlobalContext } from "../../layouts/context"
import CSCookies from "../../library/cookies"
import CSToast from "../../library/toast"
import { updateMoods } from "../../redux/app"
import Post from "./Post"

import * as T from "./types/post"

function init(): T.PostList {
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

function infiniteScrollIntersection(
    instance: HTMLDivElement,
    response: T.PostList,
    reFetchPosts: (url: string, update: boolean) => void,
) {
    const postElements = instance.querySelectorAll("section[data-post]")!
    const lastPostElement = postElements[postElements.length - 1]

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (response.links.next) {
                    reFetchPosts(response.links.next, true)
                }
                observer.unobserve(entry.target)
            }
        })
    })

    if (lastPostElement) {
        observer.observe(lastPostElement)
    }
}

export default function PostContainer() {
    const { moods } = useContext(GlobalContext)

    const [posts, setPosts] = useState(init())
    const [loading, toggleLoading] = useState(false)

    const postsWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        if (!!posts.page_index) {
            infiniteScrollIntersection(
                postsWrapperRef.current!,
                posts,
                reFetchPosts,
            )
        }
    }, [posts.data])

    useEffect(() => {
        const _p = CSCookies.get("post")
        if (moods.updateFeeds === "post" && _p) {
            const post: T.Post = JSON.parse(_p)

            CSCookies.del("post")
            updateMoods({ updateFeeds: null })
            setPosts((prev) => ({ ...prev, data: [post, ...prev.data] }))
        }
    }, [moods])

    const fetchPosts = async (
        url: string = "/feeds",
        update: boolean = false,
    ) => {
        toggleLoading(true)
        celesupBackendApi
            .get(url)
            .then((response) => {
                setPosts((prev) => {
                    if (update) {
                        return {
                            ...response.data,
                            data: [...prev.data, ...response.data.data],
                        }
                    } else {
                        return { ...response.data }
                    }
                })
            })
            .catch((err: any) => {
                const errMsg = getErrorMessageFromRequest(err)
                console.error(errMsg)
                new CSToast({
                    canClose: false,
                    text: errMsg,
                    showProgress: false,
                })
            })
            .finally(() => {
                toggleLoading(false)
            })
    }

    async function reFetchPosts(url: string, update: boolean) {
        fetchPosts(url, update)
    }

    return (
        <div
            ref={postsWrapperRef}
            className="flex items-center flex-col gap-[.5rem] mt-2 w-full relative"
        >
            {loading && (
                <div className="absolute top-0 left-0 py-4 min-h-[300px] w-full">
                    <Loading loader="spinner" />
                </div>
            )}

            {posts.data?.map((post, idx, posts) => {
                return (
                    <section
                        data-post
                        key={post.key}
                        className="flex justify-center w-full"
                    >
                        <Post data={post} />
                        {idx !== posts.length - 1 && <></>}
                    </section>
                )
            })}

            {!!posts.page_index && !posts.data.length && (
                <p className="flex w-full min-h-[200px] mx-auto h-full p-2 items-center justify-center text-center">
                    <span
                        data-hint-text
                        className="max-w-[35ch] inline-block text-lg tracking-wide animate-pulse"
                    >
                        No post be the first to post!
                    </span>
                </p>
            )}

            <div className="w-full py-4"></div>
        </div>
    )
}
