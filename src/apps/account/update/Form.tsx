import Avatar from "./Avatar"
import Gender from "./Gender"
import Inputs from "./Inputs"
import Cropper from "./Cropper"
import { useEffect, useState } from "react"
import type { Form } from "./types"
import { AuthUserProfile } from "../types"

type Props = {
    profile: AuthUserProfile
    updateData: (callback: (update: any) => any) => void
    submit: any
}

export default function Form({ profile, submit, updateData }: Props) {
    const [formData, updateFormData] = useState<Form>({
        name: profile.name,
        biography: profile.biography,
        avatar: { url: profile.avatar, file: null },
        cover_img: { url: profile.cover_img, file: null },
        city: profile.city,
        gender: profile.gender,
    })

    const [pending, togglePending] = useState(false)

    function handleFormChange(ev: any) {}
    function handleFormSubmit(ev: any) {
        ev.preventDefault()
        if (formData.gender) {
            formData.gender = formData.gender.toLowerCase()
        }
        submit(formData)
    }

    useEffect(() => {
        if (updateData) updateData((prev) => ({ ...prev, ...formData }))
    }, [formData])

    return (
        <form
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            className="block w-full h-full"
        >
            {/* profile */}
            <Avatar formData={formData} updateFormData={updateFormData} />
            {/* form fields */}
            <Inputs formData={formData} updateFormData={updateFormData} />
            {/* gender */}
            <Gender formData={formData} updateFormData={updateFormData} />

            {/* <Cropper /> */}
            <button
                data-submit-update
                className="hidden pointer-events-none"
            ></button>
        </form>
    )
}
