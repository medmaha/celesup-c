import React from "react"
import Textarea from "../../../components/UI/Textarea"
import { Form } from "./types"

type Props = {
    formData: Form
    updateFormData: (data: (prev: Form) => Form) => void
}

export default function Inputs({ formData, updateFormData }: Props) {
    function handleFormChange(ev: any) {
        const name: "name" | "city" | "biography" = ev.target.name
        const value: string = ev.target.value

        updateFormData((prev) => {
            return { ...prev, [name]: value }
        })
    }

    return (
        <div className="flex items-center flex-col pt-4 gap-2">
            <div className="flex flex-col w-full ">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="cs-input"
                    onChange={handleFormChange}
                    value={formData.name || ""}
                />
            </div>

            <div className="flex flex-col w-full ">
                <label htmlFor="bio">Bio</label>

                <Textarea
                    value={formData.biography}
                    name="biography"
                    rows={2}
                    icon={null}
                    className={"bg-primary"}
                />
            </div>
            <div className="flex flex-col w-full ">
                <label htmlFor="City">City</label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    className="cs-input"
                    value={formData.city || ""}
                    onChange={handleFormChange}
                />
            </div>
        </div>
    )
}
