import React, { useState } from "react"

import Modal from "../../components/UI/M"
import { celesupBackendApi } from "../../axiosInstance"
import { Form } from "./update"

export default function UpdateProfile({
    profile,
    updateProfile,
    openUpdateModal,
}) {
    const [formData, setFormData] = useState({
        name: profile.name,
        biography: profile.biography,
        avatar: profile.avatar,
        cover: profile.cover_img,
        city: profile.city,
        gender: profile.gender,
    })

    async function handleFormSubmit(ev) {
        // ev.preventDefault()

        console.log(formData)
        return

        const form = new FormData()
        form.append("profileId", profile.id)
        form.append("refreshToken", localStorage.getItem("refresh"))

        if (profile.avatar === formData.avatar) {
            delete formData["avatar"]
        }
        if (profile.cover_img === formData.cover) {
            delete formData["cover"]
        }

        for (const field in formData) {
            if (formData[field] && formData[field] !== profile[field]) {
                form.append(field, formData[field])
            }
        }

        await celesupBackendApi
            .put("profile/edit", form, {
                headers: { "content-type": "multipart/form-data" },
            })
            .then((res) => {
                updateProfile(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <Modal
            actionBtn={
                <button
                    disabled={!formData.valid}
                    className="bg-primary disabled:bg-gray-400 px-4 py-1 rounded-md"
                >
                    Save
                </button>
            }
            title="Update profile"
            content={
                <section className="">
                    <Form profile={profile} />
                </section>
            }
        />
    )
}
