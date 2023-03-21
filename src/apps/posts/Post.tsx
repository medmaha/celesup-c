import Image from "next/image"
import { useContext, useEffect, useReducer, useState } from "react"
import { celesupBackendApi } from "../../axiosInstance"

import { GlobalContext } from "../../layouts/context"

import CSDateTime from "../../library/dateTime"
import UserCard from "../../components/UI/UserCard"
import CommentsWrapper from "../comments"
import { Headers, Typography, Media, Interactions } from "./components"
import postOpsReducer from "./utils/postOpsReducer"

import * as T from "./types/post"

type Props = {
    data: T.Post
}

export default function Post({ data }: Props) {
    const [post, setPostData] = useState({
        ...data,
        created_at: new CSDateTime(data.created_at).format(),
        // child: {
        //     ...data.child,

        // },
    })
    const [options, dispatchPostReducer] = useReducer(postOpsReducer, {})

    const globalContext = useContext(GlobalContext)

    function showCommentsBaseOnAction() {}

    async function updatePostData(_data: T.Post) {
        const _post = {
            ..._data,
            created_at: new CSDateTime(_data.created_at).format(),
        }
        setPostData(_post)
        return true
    }

    async function sendHttpRequest(
        url: string,
        method: "get" | "post" | "put" | "delete" = "get",
    ) {
        const form = new FormData()
        form.append("post_key", post.key)

        try {
            const { data } = await celesupBackendApi[method](url, form)
            console.table(data)
            await updatePostData(data)
        } catch (error) {
            console.error(error)
            setPostData({
                ...post,
                created_at: new CSDateTime(data.created_at).format(),
            })
        }

        return true
        // postWS.send(JSON.stringify({ type: "POST_LIKE" }))

        // if (postData.author.id !== context.user.id) {
        //     context.webSocketMaster.send(
        //         JSON.stringify({
        //             type: "NOTIFY_USER",
        //             payload: {
        //                 user_id: postData.author.id,
        //             },
        //         }),
        //     )
        // }
    }

    async function handlePostLike() {
        try {
            await sendHttpRequest("/posts/like", "post")
        } catch (error) {
            console.error(error)
        }
        showCommentsBaseOnAction()
    }

    return (
        <>
            {post.key && (
                <div className="w-full max-w-[550px]">
                    <div className="flex w-full">
                        <div className="mr-[12px]  min-w-max">
                            <UserCard
                                btnElement={
                                    <div className="rounded-full outline-2 cs-outline w-[48px] h-[48px]">
                                        <Image
                                            className="rounded-full"
                                            width={48}
                                            height={48}
                                            style={{ objectFit: "cover" }}
                                            src={post.author.avatar}
                                            alt={post.author.username}
                                        />
                                    </div>
                                }
                                author={post.author}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <Headers data={post} />
                            <Typography data={post} />
                            <Media data={post} />
                            {post.child && (
                                <>
                                    <div className="cs-outline outline-[1px] p-2 mt-4 rounded-md">
                                        <div className="flex w-full">
                                            <div className="mr-[10px]  min-w-max">
                                                <UserCard
                                                    btnElement={
                                                        <div className="rounded-full outline-2 cs-outline w-[35px] h-[35px]">
                                                            <Image
                                                                className="rounded-full"
                                                                width={35}
                                                                height={35}
                                                                style={{
                                                                    objectFit:
                                                                        "cover",
                                                                }}
                                                                src={
                                                                    post.author
                                                                        .avatar
                                                                }
                                                                alt={
                                                                    post.author
                                                                        .username
                                                                }
                                                            />
                                                        </div>
                                                    }
                                                    author={post.author}
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <Headers
                                                    data={post.child}
                                                    isChild={true}
                                                />
                                                <Typography data={post.child} />
                                                <Media data={post.child} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            <Interactions
                                stats={post.stats}
                                client={post.client}
                                handlePostLike={handlePostLike}
                                dispatchPostReducer={dispatchPostReducer}
                                post_id={post.child?.key || post.key}
                                authorName={
                                    post.child
                                        ? post.child.author.name ||
                                          post.child.author.username
                                        : post.author.name ||
                                          post.author.username
                                }
                            />
                        </div>
                    </div>
                    <div className="pl-0 w-full mobile:pl-[50px] inline-block">
                        {options.showComments && (
                            <>
                                <span className="cs-divider"></span>
                                <CommentsWrapper post={post} />
                            </>
                        )}
                        <div
                            className={`${
                                !!options.showComments ? "" : "mt-2"
                            }`}
                        >
                            <span className="cs-divider h-[2px]"></span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
