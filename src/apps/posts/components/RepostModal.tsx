import Image from "next/image"
import { useContext, useEffect, useRef, useState } from "react"
import { celesupBackendApi } from "../../../axiosInstance"
import Loading from "../../../components/UI/Loading"
import Modal from "../../../components/UI/Modal"
import Textarea from "../../../components/UI/Textarea"
import { GlobalContext } from "../../../layouts/context"
import CSDateTime from "../../../library/dateTime"
import CSTypography from "../../../library/typography"
import { Post } from "../types/post"
import Headers from "./Headers"
import Media from "./Media"
import Typography from "./Typography"
import CSCookies from "../../../library/cookies"
import { updatePostForm, updatePostPages } from "../../../redux/create"
import { updateMoods } from "../../../redux/app"
import CSToast from "../../../library/toast"

let cachedTimeout: NodeJS.Timeout

type RepostProps = {
    setRepost: (data: boolean) => any
    post_id: string
    author: string
}

export default function RepostModal({
    setRepost,
    post_id,
    author,
}: RepostProps) {
    const elementRef = useRef(document.createElement("div"))
    const [dialog, toggleDialog] = useState(false)
    const [instantShare, setInstantShare] = useState(false)
    const [submitDialog, setSubmitDialog] = useState(false)

    function clearCachedTimeout() {
        clearTimeout(cachedTimeout)
    }

    function openModal() {
        toggleDialog(true)
    }
    function repost() {
        setInstantShare(true)
    }

    function animateScroll(duration: number) {
        var start = window.pageYOffset
        var end = start - -200
        var distance = end - start
        var startTime: null | number = null

        function animation(currentTime: number) {
            if (startTime === null) startTime = currentTime
            var timeElapsed = currentTime - startTime
            var scrollPosition = easeInOutCubic(
                timeElapsed,
                start,
                distance,
                duration,
            )
            window.scrollTo(0, scrollPosition)
            if (timeElapsed < duration) requestAnimationFrame(animation)
        }

        function easeInOutCubic(t: number, b: number, c: number, d: number) {
            t /= d / 2
            if (t < 1) return (c / 2) * t * t * t + b
            t -= 2
            return (c / 2) * (t * t * t + 2) + b
        }

        requestAnimationFrame(animation)
    }

    useEffect(() => {
        const elm = elementRef.current

        if (elm) {
            elm.addEventListener("click", clearCachedTimeout)
            cachedTimeout = setTimeout(() => {
                setRepost(false)
            }, 6000)

            const elmPosition = elm.getBoundingClientRect().y
            const screenHeight = window.innerHeight

            const screenAndPositionRatio = screenHeight / elmPosition

            if (screenAndPositionRatio < 1.3) {
                animateScroll(100)
            }
            return () => {
                elm.removeEventListener("click", clearCachedTimeout)
            }
        }
    }, [])

    return (
        <>
            {!dialog && (
                <div
                    ref={elementRef}
                    className="absolute top-full right-[-7em] sm:right-[-5em] mobile:right-[-3em] lg:right-[-10em] mt-2 z-10 mx-1"
                >
                    <div className="cs-card w-full max-w-[320px] md:max-w-[400px] min-w-max block p-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center secondary-text">
                                <div className="">
                                    <span>
                                        <svg
                                            style={{ fill: "currentcolor" }}
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="flex flex-col w-full">
                                    <button
                                        onClick={openModal}
                                        className="font-semibold w-max text-base tracking-wide secondary-text"
                                    >
                                        Repost with your thoughts
                                    </button>
                                    <p className="text-sm tracking-wide tertiary-text max-w-[280px]  sm:max-w-[320px] md:max-w-[400px]">
                                        Create a new post with{" "}
                                        {CSTypography.capitalize(author)}&apos;s
                                        post attached to it
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center secondary-text">
                                <div className="">
                                    <span>
                                        <svg
                                            style={{ fill: "currentcolor" }}
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="flex flex-col w-full">
                                    <button
                                        onClick={repost}
                                        className="w-max font-semibold text-base tracking-wide secondary-text"
                                    >
                                        Repost
                                    </button>
                                    <p className="text-sm tracking-wide tertiary-text max-w-[280px] sm:max-w-[320px] md:max-w-[400px]">
                                        Instantly bring{" "}
                                        {CSTypography.capitalize(author)}&apos;s
                                        post to other&apos;s feeds
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {instantShare && (
                <ModalBody
                    setRepost={setRepost}
                    post_id={post_id}
                    submit={submitDialog}
                    setSubmitDialog={setSubmitDialog}
                    instantShare={instantShare}
                />
            )}

            {dialog && (
                <Modal
                    title="Share"
                    onClose={() => {
                        toggleDialog(false)
                        setRepost(false)
                    }}
                    onActionClicked={() => {
                        setSubmitDialog(true)
                    }}
                    actionBtnText={"Share post"}
                    jsxContent={
                        <ModalBody
                            setRepost={setRepost}
                            post_id={post_id}
                            submit={submitDialog}
                            setSubmitDialog={setSubmitDialog}
                            instantShare={instantShare}
                        />
                    }
                />
            )}
        </>
    )
}

type Props = {
    post_id: string
    submit: boolean
    instantShare: boolean
    setRepost: (data: boolean) => void
    setSubmitDialog: (data: boolean) => void
}

function ModalBody({
    post_id,
    submit,
    setSubmitDialog,
    setRepost,
    instantShare = false,
}: Props) {
    const [post, setPost] = useState<Post | null>(null)
    const [excerpt, setExcerpt] = useState("")
    const [pending, togglePending] = useState(false)

    const { user, storeDispatch } = useContext(GlobalContext)

    useEffect(() => {
        if (submit) {
            createRepost()
            setSubmitDialog(false)
        }
    }, [submit])

    useEffect(() => {
        if (instantShare) {
            createRepost()
            setSubmitDialog(false)
        }
    }, [instantShare])

    async function createRepost() {
        togglePending(true)
        if (excerpt.length > 4 || !!instantShare) {
            try {
                type __DATA = {
                    post_id: string
                    excerpt: null | string
                }
                const __data: __DATA = { post_id, excerpt: null }

                if (!instantShare) {
                    __data["excerpt"] = excerpt
                }
                const { data } = await celesupBackendApi.post("/posts/repost", {
                    post_id,
                    excerpt,
                })
                const callback = () => {
                    CSCookies.set({
                        name: "post",
                        value: JSON.stringify(data),
                    })
                    storeDispatch(updatePostForm({ dispatch: true }))
                    storeDispatch(updatePostPages({ dispatch: true }))
                    storeDispatch(
                        updateMoods({
                            updateFeeds: "post",
                            create: false,
                        }),
                    )
                }
                callback()
                new CSToast({
                    text: "Repost successful",
                    autoClose: 3000,
                    className: "success",
                })
                setRepost(false)
            } catch (error: any) {
                console.error(error.message)
            }
            togglePending(false)
        }
    }

    async function getPost() {
        try {
            const { data } = await celesupBackendApi.get(
                "/posts/retrieve?pid=" + post_id,
            )
            setPost({
                ...data,
                created_at: new CSDateTime(data.created_at).format(),
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    if (instantShare) return <></>
    return (
        <>
            <div className="w-full relative min-h-[200px] h-full max-w-[550px] pb-2">
                {pending && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
                        <Loading
                            text={instantShare ? "Reposting" : "Creating"}
                            loader="spinner"
                        />
                    </div>
                )}
                {post?.key && user && (
                    <>
                        <div className="overflow-hidden overflow-y-auto max-h-[300px] mt-1 p-1 pr-2 h-full w-full block">
                            <div className="flex items-center gap-[.6rem] pt-1">
                                <div className="min-w-max">
                                    <div className="rounded-full outline-2 cs-outline w-[50px] h-[50px]">
                                        {user?.avatar && (
                                            <Image
                                                className="rounded-full w-full h-full"
                                                width={50}
                                                height={50}
                                                style={{
                                                    objectFit: "cover",
                                                }}
                                                src={user.avatar}
                                                alt={
                                                    "author " +
                                                    user.username +
                                                    " avatar"
                                                }
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="">
                                        <p className="tracking-wide px-1 font-semibold">
                                            {user?.name ? (
                                                <span>{user.name}</span>
                                            ) : (
                                                <span>@{user.username}</span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex items-center pt-1 justify-between w-[100%] bg-color rounded-sm px-1">
                                        <select
                                            name=""
                                            id=""
                                            className="py-1 px-2 rounded-md text-sm tertiary-bg cursor-pointer"
                                        >
                                            <option value="">Public</option>
                                            <option value="">Friends</option>
                                            <option value="">Followers</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="pl-12">
                                <div className="py-2">
                                    <Textarea
                                        rows={2}
                                        icon={false}
                                        value={excerpt}
                                        onChange={(ev: any) => {
                                            setExcerpt(ev.target.value)
                                        }}
                                        submitOnEnter={false}
                                        placeholder="Start writing or use @ to mention people. ect"
                                    />
                                </div>
                                <div className="p-2 outline-[1px] cs-outline rounded-md">
                                    <div className="flex w-full my-4">
                                        <div className="mr-[12px] w-[35px] h-[35px] min-w-max">
                                            <Image
                                                className="rounded-full"
                                                width={35}
                                                height={35}
                                                style={{
                                                    objectFit: "cover",
                                                }}
                                                src={post.author.avatar}
                                                alt={post.author.username}
                                            />
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <Headers data={post} menu={false} />
                                            <Typography data={post} />
                                            <Media data={post} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {!post && <Loading loader="spinner" text={null} />}
            </div>
        </>
    )
}
