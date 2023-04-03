export type AuthUserProfile = {
    id: string
    avatar: string
    cover_img: string
    date_joined: Date
    name: string | null
    city: string | null
    account_type: "Celebrity" | "Supporter" | "Administrator" | "Unspecified"
    gender: "Male" | "Female" | "Other" | "Unspecified"
    email_privacy: boolean
    username: string | null
    biography: string | null
    public_email: string | null
}
