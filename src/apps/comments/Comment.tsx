import Image from "next/image"
import { useContext, useRef, useState } from "react"

import { capitalize } from "../../library/texts"
import CSDateTime from "../../library/dateTime"
import Icon from "../../components/UI/Icon"
import Textarea from "../../components/UI/Textarea"
import { celesupBackendApi } from "../../axiosInstance"
import UserCard from "../../components/UI/UserCard"
import { GlobalContext } from "../../layouts/context"

import { CommentInterface, CommentPropsInterface } from "./interface"

export default function Comment({
    data,
    hasNext,
    updateComments,
}: CommentPropsInterface) {
    const commentRef = useRef(null)
    const [comment, setComment] = useState(data)
    const globalContext = useContext(GlobalContext)
    const [toggleReply, setToggleReply] = useState(false)
    const commentDateTime = new CSDateTime(data.created_at)

    function handleCommentReplyChange(ev) {
        const content = ev.currentTarget
        if (content.value?.trim().length < 2) return
    }

    function handleCommentReplySubmit(ev) {
        const content = ev.target
        if (content.value?.trim().length < 2) return

        const url = "/comments/create"
        const form = new FormData()

        form.append("post", comment.post.key)
        form.append("parent", comment.id)
        form.append("content", content.value.trim())

        celesupBackendApi
            .post(url, form)
            .then((res) => {
                const reply = res.data
                console.log(reply)

                content.blur()
                content.value = ""
                updateComments({
                    type: "INSERT_NEW_REPLY",
                    payload: { reply, comment_id: comment.id },
                })
            })
            .catch((err) => {})
    }

    function renderParentName(cmm: CommentInterface) {
        function render(reply: CommentInterface, idx: number) {
            if (reply.parent) {
                return (
                    <>
                        {reply.author.id !== comment.author.id && (
                            <>
                                <UserCard
                                    link={true}
                                    author={reply.author}
                                    btnElement={getUsername(reply.author)}
                                />
                                <span className="text-primary">{" and "}</span>
                            </>
                        )}

                        {render(reply.parent, idx + 1)}
                    </>
                )
            }
            return (
                <>
                    <UserCard
                        link={true}
                        author={reply.author}
                        btnElement={getUsername(reply.author)}
                    />
                    <span className="text-primary">{" and "}</span>
                    {renderParentName(reply)}
                </>
            )
        }

        if (cmm.parent?.id) {
            return render(comment.parent, 0)
        }

        function getUsername(author) {
            if (author.id === globalContext.user.id) {
                return <span className="text-bold">Me</span>
            }
            return "@" + author.username.toLowerCase()
        }

        return (
            <UserCard
                link={true}
                author={cmm.author}
                btnElement={getUsername(comment.post.author)}
            />
        )
    }

    return (
        <div
            ref={commentRef}
            className={`flex ${!!comment.new ? "transition" : ""}`}
        >
            <div className="max-w-max">
                <UserCard
                    btnElement={
                        <div className="rounded-full outline-2 cs-outline w-[40px] h-[40px] mr-3">
                            <Image
                                className="rounded-full w-full h-full"
                                width={40}
                                height={40}
                                style={{ objectFit: "cover" }}
                                src={comment.author.avatar}
                                alt="comment author avatar"
                            />
                        </div>
                    }
                    author={comment.author}
                    link={false}
                />
            </div>
            <div className="w-full">
                <div>
                    <div className="text-lg font-medium flex items-center gap-2">
                        <UserCard
                            link={false}
                            btnElement={<span>@{comment.author.username}</span>}
                            author={comment.author}
                        />
                        <span className="text-gray-600 text-sm">
                            {commentDateTime.format()}
                        </span>
                    </div>
                    <div className="tertiary-text">
                        <span>reply to </span>
                        <span className="truncate">
                            {renderParentName(comment)}
                        </span>
                    </div>
                </div>
                <p
                    className={`mt-2 text-light text-lg tracking-wide ${
                        comment.new
                            ? "text-secondary-light cs-pulse-text"
                            : "secondary-text"
                    }`}
                >
                    {/*? inline callback function for displaying a hint text for new comment so it get noticed */}
                    {comment.new && (
                        <>
                            {(() => {
                                setTimeout(() => {
                                    setComment((prev) => {
                                        return {
                                            ...prev,
                                            new: false,
                                        }
                                    })
                                }, 2500)
                            })()}
                        </>
                    )}
                    {comment.content}
                </p>
                <div className="mt-2 ">{comment.updated_at}</div>
                <div className="mt-2">
                    <div className="flex gap-2 w-full">
                        <button
                            title={capitalize("like")}
                            className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800"
                            onClick={() => {}}
                        >
                            <Icon name="like" className="w-[14px] h-[14px]" />
                            <span className="text-sm">72</span>
                        </button>
                        <button
                            title={capitalize("reply")}
                            className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800"
                            onClick={() => setToggleReply(true)}
                        >
                            <Icon
                                name="comment"
                                className="w-[14px] h-[14px]"
                            />
                            <span className="text-sm">23</span>
                        </button>

                        <button
                            className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800"
                            onClick={() => {}}
                        >
                            <Icon name="share" className="w-[14px] h-[14px]" />
                            <span className="text-sm">12</span>
                        </button>
                    </div>
                    {toggleReply && (
                        <div className="mt-2">
                            <Textarea
                                id={`post_${comment.post.key}_${comment.id}_comment_reply`}
                                rows={2}
                                placeholder="Reply to maha's comment..."
                                className="mt-2 rounded-lg"
                                submitOnEnter={true}
                                onChange={handleCommentReplyChange}
                                onSubmit={handleCommentReplySubmit}
                            />
                        </div>
                    )}
                </div>
                {hasNext && <span className="cs-divider"></span>}
            </div>
        </div>
    )
}
