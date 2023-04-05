export type Gender = "Male" | "Female" | "Other" | "Unspecified" | string

export type Form = {
    name: string | null
    biography: string | null
    avatar: { url: string; file: File | null }
    cover_img: { url: string; file: File | null }
    city: string | null
    gender: Gender
}
