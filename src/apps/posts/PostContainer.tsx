import { useContext, useEffect, useState } from "react"
import { celesupBackendApi } from "../../axiosInstance"
import { GlobalContext } from "../../layouts/context"
import CSCookies from "../../library/cookies"
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

export default function PostContainer() {
    const { moods } = useContext(GlobalContext)

    const [posts, setPosts] = useState(init())

    useEffect(() => {
        console.log("fetching")

        fetchPosts()
        console.log("FETCHED")
    }, [])

    useEffect(() => {
        const _p = CSCookies.get("post")
        if (moods.updateFeeds === "post" && _p) {
            const post: T.Post = JSON.parse(_p)

            CSCookies.del("post")
            updateMoods({ updateFeeds: null })
            setPosts((prev) => ({ ...prev, data: [post, ...prev.data] }))
        }
    }, [moods])

    const fetchPosts = async () => {
        celesupBackendApi
            .get("/feeds")
            .then((response) => {
                setPosts({
                    ...response.data,
                })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    return (
        <div className="flex items-center flex-col gap-[.5rem] mt-2 w-full">
            {posts.data?.map((post, idx, posts) => {
                return (
                    <span key={post.key} className="flex justify-center w-full">
                        <Post data={post} />
                        {idx !== posts.length - 1 && <></>}
                    </span>
                )
            })}
        </div>
    )
}
