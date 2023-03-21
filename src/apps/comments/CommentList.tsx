import React, { useEffect, useMemo } from "react"
import { useRef } from "react"
import { useLayoutEffect } from "react"
import { usePostComment } from "../../hooks"
import Comment from "./Comment"

import { CommentInterface, CommentListPropsInterface } from "./interface"

export default function CommentList({
    post,
    comments,
    getComments,
    updateComments,
}: CommentListPropsInterface) {
    const commentsListRef = useRef<HTMLDivElement>()

    useLayoutEffect(() => {
        console.log(commentsListRef.current.getBoundingClientRect())
    }, [])

    useEffect(() => {
        console.log(commentsListRef.current.getBoundingClientRect())
        getComments()
    }, [getComments])

    const renderComments = (
        comments: CommentInterface[],
        hasNext: boolean,
        sStart = 0,
        sEnd = 3,
        start = true,
    ) => {
        //

        return (
            <>
                {comments.slice(sStart, sEnd).map((comment, idx) => {
                    return (
                        <div key={comment.id} className="w-full">
                            <Comment
                                data={{
                                    ...comment,
                                    post: post,
                                }}
                                hasNext={!!comments[idx + 1] || !!hasNext}
                                updateComments={updateComments}
                            />
                            {comment.replies.length > 0 &&
                                comment.replies.length > 0 &&
                                renderComments(
                                    comment.replies,
                                    true,
                                    0,
                                    2,
                                    false,
                                )}
                        </div>
                    )
                })}
                {comments.length > sEnd && (
                    <div
                        className={`my-2 ${
                            start ? "" : "ml-0 mobile:ml-[50px]"
                        } w-full bg-red-400`}
                    >
                        <button className="text-secondary text-sm cursor-pointer">
                            load {comments.length - sEnd} more{" "}
                            {start ? "comments" : "replies"}?{" "}
                        </button>
                    </div>
                )}
            </>
        )
    }

    return (
        <div ref={commentsListRef} className="">
            <div className="px-2 mobile:px-0">
                {comments.data?.length > 0 && (
                    <>
                        <span className="cs-divider"></span>
                        {renderComments(comments.data, false)}
                    </>
                )}
            </div>
        </div>
    )
}
