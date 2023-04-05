import React, { useContext, useEffect, useRef, useState } from "react"

import Modal from "./update/Modal"
import { Form } from "./update"
import { updateUserProfile } from "../../library/cloud/methods"
import { GlobalContext } from "../../layouts/context"
import { celesupBackendApi } from "../../axiosInstance"
import jwtDecode from "jwt-decode"
import { AuthUser } from "../../types/user"
import { updateAuthTokens, updateAuthUser } from "../../redux/app"
import CSToast from "../../library/toast"
import CSCryptography from "../../library/crypto"

type Props = {
    profile: any
    updateProfile: (callback: (update: any) => any) => void
    openUpdateModal: (callback: (update: boolean) => boolean) => void
}

type ProfileData = {
    name: string
    biography: string
    avatar: { url: string; file: File | null }
    cover_img: { url: string; file: File | null }
    city: string
    gender: string
    valid: boolean
    profileId: string
}

export default function UpdateProfile({
    profile,
    updateProfile,
    openUpdateModal,
}: Props) {
    const [valid, toggleValid] = useState<boolean>(false)
    const { user, storeDispatch } = useContext(GlobalContext)

    const [formData, setFormData] = useState({
        name: profile.name,
        biography: profile.biography,
        avatar: { url: profile.avatar, file: null },
        cover_img: { url: profile.cover_img, file: null },
        city: profile.city,
        gender: profile.gender,
        valid: false,
        profileId: user.id,
    })

    const [pending, togglePending] = useState(false)

    const updateRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement | null>(null)

    useEffect(() => {
        const formFields = Object.entries(formData)
        for (const [field, value] of formFields) {
            if (!!value && value !== profile[field] && !value?.url) {
                toggleValid(true)
                break
            } else if (value?.url && value.url !== profile[field]) {
                toggleValid(true)
                break
            } else {
                toggleValid(false)
            }
        }
        return () => togglePending(false)
    }, [formData])

    useEffect(() => {
        const formElm: HTMLFormElement =
            updateRef.current?.querySelector("form")!
        formRef.current = formElm
    }, [])

    async function submit(form: ProfileData) {
        let _data: any = formData

        if (form.avatar.file) {
            const url = await updateUserProfile(
                user,
                "avatar",
                form.avatar.file,
            )
            _data = { ..._data, avatar: url }
        } else {
            _data = { ..._data, avatar: form.avatar.url }
        }
        if (form.cover_img.file) {
            const url = await updateUserProfile(
                { ...user, cover_img: profile.cover_img },
                "cover_img",
                form.cover_img.file,
            )
            _data = { ..._data, cover_img: url }
        } else {
            _data = { ..._data, cover_img: form.cover_img.url }
        }

        if (!!Object.keys(_data).length) {
            _data["profileId"] = user.id
            try {
                const { data } = await celesupBackendApi.put(
                    "/profile/edit",
                    _data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                )
                let user
                if (data) {
                    const tokens = data.tokens
                    const decodedToken: { user: AuthUser } = jwtDecode(
                        tokens.access,
                    )

                    user = decodedToken.user
                    const encodedUserData = CSCryptography.encrypt(
                        JSON.stringify(user),
                    )

                    localStorage.setItem("ata", tokens.access)
                    localStorage.setItem("atr", tokens.refresh)
                    localStorage.setItem("a-usr", encodedUserData)

                    updateProfile(data.user)
                    storeDispatch(
                        updateAuthUser({
                            user,
                        }),
                    )
                    storeDispatch(
                        updateAuthTokens({
                            tokens,
                        }),
                    )
                    openUpdateModal(() => false)
                } else {
                    new CSToast({
                        text: "Something terribly went wrong",
                        position: "top-center",
                        className: "invalid",
                    })
                    user = null
                }
            } catch (error: any) {
                // todo handle error
                console.error(error.message)
            }
            togglePending(false)
        }
    }

    return (
        <div
            ref={updateRef}
            onKeyDown={(ev) => {
                const btn: HTMLButtonElement =
                    ev.currentTarget.querySelector("[data-action-btn")!
                btn.disabled = !valid
            }}
        >
            <Modal
                pending={pending}
                pendingText="Updating profile"
                actionBtn={
                    <button
                        data-action-btn
                        onClick={(ev) => {
                            ev.currentTarget.disabled = !pending
                            if (formRef.current) {
                                const btn: HTMLButtonElement =
                                    formRef.current.querySelector(
                                        "button[data-submit-update]",
                                    )!

                                btn.click()
                                togglePending(true)
                                // formRef.current.submit()
                            }
                        }}
                        disabled={!valid}
                        className="bg-primary disabled:bg-gray-400 px-4 py-1 rounded-md"
                    >
                        Save
                    </button>
                }
                title="Update profile"
                content={
                    <section className="">
                        <Form
                            profile={profile}
                            submit={submit}
                            updateData={setFormData}
                        />
                    </section>
                }
                onClose={() => {
                    openUpdateModal(() => false)
                }}
            />
        </div>
    )
}
