import React, {
    useContext,
    useEffect,
    useState,
    useReducer,
    useLayoutEffect,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { GlobalContext } from "../../../../layouts/context"
import { celesupBackendApi } from "../../../../axiosInstance"
import DateTime from "../../../../library/dateTime"

import { updatePostPages } from "../../../../redux/create"
import NextImage from "next/image"
import { resolve } from "path"

import * as T from "../types/PostCreateDispatcher"
import * as ST from "../../../../redux/types/index"

export default function PostPreview() {
    const context = useContext(GlobalContext)
    const { form, pages } = useSelector(
        (state: ST.AppStore) => state.create.post,
    )
    const [post, setPost] = useState<any>()

    const storeDispatch = useDispatch()

    useEffect(() => {
        console.log(form, pages)
        async function func() {
            const data = await getInitialPostData(context, form)
            setPost(data)
        }
        func()
        storeDispatch(
            updatePostPages({
                prev: pages.current,
                current: "PREVIEW",
                next: null,
            }),
        )
        // eslint-disable-next-line
    }, [])

    function updatePost(field: string, value: string) {
        setPost((prev: any) => {
            return {
                ...prev,
                [field]: value,
            }
        })
    }

    return (
        <>
            {post ? (
                <div className="px-2 transition">
                    <header className="flex items-center justify-between w-full p-2">
                        <div className="flex items-center">
                            <div className="rounded-full cs-border w-[50px] h-[50px]">
                                <NextImage
                                    crossOrigin="anonymous"
                                    src={post.author.avatar}
                                    alt="author avatar"
                                    width={50}
                                    height={50}
                                    className="cursor-pointer rounded-full"
                                />
                            </div>
                            <section className="username px-1 cursor-pointer">
                                {post.author.id === context.user.id ? (
                                    <span className="flex flex-col gap-[5px]">
                                        <b>Me</b>
                                        <span className="secondary-text">
                                            @
                                            {post.author.username.toLowerCase()}
                                        </span>
                                    </span>
                                ) : (
                                    <>
                                        {post.author.full_name ? (
                                            <span className="flex flex-col gap-[5px]">
                                                <b>{post.author.full_name}</b>
                                                <span className="secondary-text">
                                                    @
                                                    {post.author.username.toLowerCase()}
                                                </span>
                                            </span>
                                        ) : (
                                            <span>
                                                <b>@{post.author.username}</b>
                                            </span>
                                        )}
                                    </>
                                )}
                            </section>
                        </div>
                        <div className="">
                            <span className="text-sm secondary-text">
                                {post.created_at}
                            </span>
                        </div>
                    </header>
                    <div className="pl-4 pb-1">
                        <div className="text-lg">{post.caption || ""}</div>
                        <div className="text-sm">
                            <small>{post.hashtags || ""}</small>
                        </div>
                        <p className="tracking-wider leading-3 font-sm">
                            {post.excerpt || ""}
                        </p>

                        {post.picture && (
                            <div className="justify-start min-h-[200px] transition-[height]">
                                <NextImage
                                    src={post.picture.src}
                                    width={post.picture.width}
                                    height={post.picture.height}
                                    alt="post image"
                                    className=" rounded-md transition"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="h-[400px] tertiary-bg w-full"></div>
            )}
        </>
    )
}

async function getInitialPostData(context: any, formData: any) {
    type IMG = { src: string; width: number; height: number }

    async function img(src: string): Promise<IMG> {
        var _i = new Image()
        _i.src = src

        return new Promise((resolve) => {
            _i.onload = () => {
                const data = {
                    src,
                    width: _i.width,
                    height: _i.height,
                }
                resolve(data)
            }
        })
    }

    const picture = formData.media?.picture
        ? await img(formData.media.picture.url)
        : null
    // console.log(formData)
    return new Promise((resolve) => {
        resolve({
            id: "fake-post-id",
            author: {
                ...context.user,
                avatar: context.user.avatar,
            },
            caption: formData.caption,
            excerpt: formData.excerpt,
            hashtags: formData.hashtags,
            created_at: new DateTime(new Date().toUTCString()).format(),
            video: formData.video && URL.createObjectURL(formData.video),
            picture: picture,
        })
    })
}
