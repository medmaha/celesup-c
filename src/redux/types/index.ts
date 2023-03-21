import { GlobalContext } from "../../types/global"

export type CreateMedia = {
    post: {
        pages: PostCreateNavigators
        form: CreateMediaForm
    }

    video: {}
}

export type AppStore = {
    main: GlobalContext
    create: CreateMedia
}

export type PhotoMedia = {
    name: string
    url: string
    width: number
    height: number
    alt_text: string
}

export type MediaFiles = {
    picture: PhotoMedia
}

export type CreateMediaForm = {
    caption?: string
    excerpt?: string
    hashtags?: string
    media?: MediaFiles
}

type Screens = "PHOTO" | "PREVIEW" | "FORM"

export type PostCreateNavigators = {
    prev: null | Screens
    current: null | Screens
    next: null | Screens
}
