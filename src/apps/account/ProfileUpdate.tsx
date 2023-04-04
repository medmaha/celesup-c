import React, { useState } from "react"

import Modal from "./update/Modal"
import { Form } from "./update"

type Props = {
    profile: any
    updateProfile: (callback: (update: any) => any) => void
    openUpdateModal: (callback: (update: boolean) => boolean) => void
}

export default function UpdateProfile({ profile }: Props) {
    const [formData, setFormData] = useState({
        name: profile.name,
        biography: profile.biography,
        avatar: profile.avatar,
        cover: profile.cover_img,
        city: profile.city,
        gender: profile.gender,
        valid: false,
    })

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
