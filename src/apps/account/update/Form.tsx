import Avatar from "./Avatar"
import Gender from "./Gender"
import Textarea from "../../../components/UI/Textarea"
import Inputs from "./Inputs"
import { useState } from "react"
import type { Form } from "./types"
import { AuthUserProfile } from "../types"

type Props = {
    profile: AuthUserProfile
}

export default function Form({ profile }: Props) {
    const [formData, updateFormData] = useState<Form>({
        name: profile.name,
        biography: profile.biography,
        avatar: profile.avatar,
        cover: profile.cover_img,
        city: profile.city,
        gender: profile.gender,
    })

    function handleFormChange(ev: any) {}
    function handleFormSubmit(ev: any) {}

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
        </form>
    )
}
