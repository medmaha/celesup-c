import { GlobalContext } from "../../../../layouts/context"
import Textarea from "../../../../components/UI/Textarea"
import HashtagField from "../../../../components/UI/HashtagField"

import { useState, useEffect, useContext, useRef } from "react"

import { useSelector } from "react-redux"
import { updatePostForm, updatePostPages } from "../../../../redux/create"

// import fileUploader from "./uploader"
import { PostContext } from "../CreatePost"
import Input from "../../../../components/UI/Input"
import Image from "next/image"

import CSCryptography from "../../../../library/crypto"

import * as StoreTypes from "../../../../redux/types"

const PostForm = () => {
    const postFormWrapperRef = useRef(document.createElement("div"))
    const globalContext = useContext(GlobalContext)
    const postContext = useContext(PostContext)
    const { form, pages } = useSelector(
        (state: StoreTypes.AppStore) => state.create.post,
    )
    const [addHashtag, setAddHashTag] = useState(!!form.hashtags)

    useEffect(() => {
        const firstInputField = postFormWrapperRef.current
            .children[0] as HTMLElement
        firstInputField?.focus()

        const current = "FORM"

        globalContext.storeDispatch(updatePostPages({ current }))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleFormChange({ target }: any) {
        globalContext.storeDispatch(
            updatePostForm({
                [target.name]: target.value,
            }),
        )
    }

    return (
        <div className="transition relative flex flex-col justify-between mt-2">
            {/* ? form Wrapper */}
            <div
                className="w-[100%] flex-1"
                style={{
                    maxHeight: "calc(var(--modal-content-max-height) - 70px)",
                    overflow: "hidden",
                    overflowY: "auto",
                }}
            >
                <div className="flex items-center gap-[.6rem] pt-1">
                    <div className="min-w-max">
                        <div className="rounded-full outline-2 cs-outline w-[60px] h-[60px]">
                            <Image
                                className="rounded-full w-full h-full"
                                width={60}
                                height={60}
                                style={{ objectFit: "cover" }}
                                src={globalContext.user.avatar}
                                alt={
                                    "author " +
                                    globalContext.user.username +
                                    " avatar"
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="">
                            <p className="tracking-wide px-1 font-semibold">
                                {globalContext.user?.name ? (
                                    <span>{globalContext.user.name}</span>
                                ) : (
                                    <span>@{globalContext.user.username}</span>
                                )}
                            </p>
                        </div>
                        <div className="flex items-center pt-1 justify-between w-[100%] bg-color rounded-sm px-1">
                            <select
                                name=""
                                id=""
                                className="py-1 px-2 rounded-md text-sm primary-bg cursor-pointer"
                            >
                                <option value="">Public</option>
                                <option value="">Friends</option>
                                <option value="">Followers</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div
                    ref={postFormWrapperRef}
                    className="px-1 flex flex-col gap-[1rem] mt-[2rem] w-full max-w-[450px] mx-auto"
                >
                    <div>
                        <Input
                            type="text"
                            name="caption"
                            autoFocus
                            autoComplete="off"
                            spellCheck={false}
                            aria-label="Post Caption"
                            placeholder={`What's on your mind? ${
                                globalContext.user.name
                                    ? globalContext.user.name
                                    : globalContext.user.username
                            }`}
                            value={form.caption || ""}
                            onChange={handleFormChange}
                            className=" px-[.5rem]"
                        />
                    </div>

                    <div>
                        <Textarea
                            id="formTextArea"
                            onChange={handleFormChange}
                            name="excerpt"
                            value={form.excerpt || ""}
                            placeholder="Add a Description"
                            rows={3}
                            className=""
                            icon={false}
                        />
                    </div>
                    <div>
                        <button
                            className="bg-primary text-white px-2 py-1 rounded-lg"
                            onClick={() => setAddHashTag((prev) => !prev)}
                        >
                            {!addHashtag ? (
                                "Add hashtag"
                            ) : (
                                <>
                                    {form.hashtags &&
                                    form.hashtags?.split("#").length > 1
                                        ? "Hashtags"
                                        : "Hashtag"}
                                </>
                            )}
                        </button>
                    </div>

                    <div className="hashtags transition-[height]">
                        {addHashtag && (
                            <HashtagField
                                name="hashtags"
                                placeholder="Add hashtags! separated by comma"
                                value={form.hashtags || ""}
                                onChange={handleFormChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostForm
