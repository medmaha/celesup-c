import React, { useRef, useLayoutEffect, useState } from "react"
import { celesupBackendApi } from "../../axiosInstance"
import Textarea from "../../components/UI/Textarea"
import { usePostComment } from "../../hooks"
import CommentList from "./CommentList"
import { Post } from "../posts/types/post"

type Props = {
    post: Post
}

export default function CommentsWrapper({ post }: Props) {
    const commentRapperRef = useRef<HTMLDivElement>(null)
    const { comments, getComments, updateComments } = usePostComment(post.key)

    const [commentText, setCommentText] = useState("")

    useLayoutEffect(() => {
        if (commentRapperRef.current && post.key) {
            commentRapperRef.current.style.display = "block"
            commentRapperRef.current.style.opacity = "1"

            const commentTextarea = commentRapperRef.current.querySelector(
                `#post_${post.key}_comment_create`,
            )! as HTMLTextAreaElement
            commentTextarea.focus()
        }
    }, [post])

    function handleCreateCommentChange(ev: any) {
        setCommentText(ev.currentTarget.value)
    }

    function handleCreateCommentSubmit(ev: any) {
        const content = commentRapperRef.current!.querySelector(
            `#post_${post.key}_comment_create`,
        ) as HTMLTextAreaElement

        if (content.value.trim().length < 2) return

        const form = new FormData()
        const url = "/comments/create"

        form.append("post", post.key)
        form.append("content", content.value.trim())

        celesupBackendApi
            .post(url, form)
            .then((res) => {
                content.value = ""
                content.blur()
                const comment = res.data
                updateComments({
                    type: "INSERT_NEW_COMMENT",
                    payload: { comment },
                })
            })
            .catch((err) => {})
    }

    return (
        <div
            id={`post_comment_wrapper-${post.key}`}
            className="rounded-lg mt-4 w-full px-1 hidden opacity-0 transition duration-[.75s] ease-in"
            ref={commentRapperRef}
        >
            <div className="mb-2 w-full px-2 mobile:px-0 mt-2">
                <div className="flex justify-between mb-2">
                    <h4 className="font-semibold"># Comments</h4>

                    <div className="inline-flex gap-2 items-center">
                        <span className="text-sm tertiary-text">
                            Filter by -
                        </span>
                        <select
                            className="secondary-bg p-1 px-2 rounded-md text-sm"
                            id=""
                        >
                            <option value="">Relevant</option>
                            <option value="">Newest</option>
                            <option value="">Oldest</option>
                        </select>
                    </div>
                </div>
                <Textarea
                    rows={1}
                    id={`post_${post.key}_comment_create`}
                    placeholder="Make a comment..."
                    className="w-full mt-2 p-2 rounded-lg"
                    submitOnEnter={true}
                    value={commentText}
                    onChange={handleCreateCommentChange}
                    onSubmit={handleCreateCommentSubmit}
                />
            </div>

            <div className="">
                <CommentList
                    post={post}
                    comments={comments}
                    getComments={getComments}
                    updateComments={updateComments}
                />
            </div>
        </div>
    )
}
