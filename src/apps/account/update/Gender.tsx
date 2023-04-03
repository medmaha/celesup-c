import { useState } from "react"
import { Form } from "./types"

type Props = {
    formData: Form
    updateFormData: (data: (prev: Form) => Form) => void
}

export default function Gender({ formData, updateFormData }: Props) {
    const [gender, setGender] = useState(
        formData.gender?.toLowerCase() || "order",
    )

    function changeGender(ev: any) {
        ev.stopPropagation()
        switch (ev.target.value) {
            case "male":
                // formData["gender"] = "female"
                updateFormData((prev) => ({ ...prev, gender: "Male" }))
                setGender("male")
                break
            case "female":
                // formData["gender"] = "male"
                updateFormData((prev) => ({ ...prev, gender: "Female" }))
                setGender("female")
                break
            case "other":
                // formData["gender"] = "male"
                updateFormData((prev) => ({ ...prev, gender: "Other" }))
                setGender("other")
                break

            default:
                break
        }
    }
    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-full pt-4">
                <label>Gender</label>
                <div className="flex gap-2 items-center">
                    <span className="inline-flex gap-2 items-center">
                        <label htmlFor="male">
                            <small>Male</small>
                        </label>
                        <input
                            type="radio"
                            name="gender"
                            id="male"
                            value={"male"}
                            onChange={changeGender}
                            checked={gender === "male"}
                        />
                    </span>

                    <span className="flex gap-2 items-center">
                        <label htmlFor="female">
                            <small>Female</small>
                        </label>
                        <input
                            type="radio"
                            name="gender"
                            id="female"
                            onChange={changeGender}
                            value={"female"}
                            checked={gender === "female"}
                        />
                    </span>

                    <span className="inline-flex gap-2 items-center">
                        <label
                            htmlFor="other"
                            className="peer-checked/other:text-sky-500"
                        >
                            <small>Other</small>
                        </label>
                        <input
                            className="peer/other accent-sky-500"
                            type="radio"
                            name="other"
                            id="other"
                            onChange={changeGender}
                            value={"other"}
                            checked={gender !== "male" && gender !== "female"}
                        />
                    </span>
                </div>
            </div>
        </div>
    )
}
