export type Gender = "Male" | "Female" | "Other" | "Unspecified"

export type Form = {
    name: string | null
    biography: string | null
    avatar: string
    cover: string
    city: string | null
    gender: Gender
}
