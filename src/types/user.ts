export type User = {
    id: string
    name?: string
    avatar: string
    cover_img?: string
    username: string
}
export type AuthUserProfile = {
    id: string
    avatar: string
    name: string | null
    city: string | null
    date_joined: string
    account_type: string
    gender: string | null
    email_privacy: boolean
    username: string | null
    cover_img: string | null
    biography: string | null
    public_email: string | null
}

export type AuthUser = {
    id: string
    name?: string
    avatar: string
    username: string
    cover_img?: string
}

export type AuthTokens = {
    ata: string
    atr: string
}
