export type Author = {
    id: string
    name?: string
    avatar: string
    username: string
}

export type Post = {
    key: string
    author: Author
    caption?: string
    excerpt?: string
    hashtags?: string
    picture: string
    video: string
    music: string
    created_at: string
    updated_at: string
}

export type PostList = {
    objects_count: number
    page_index: number
    page_size: number
    page_count: number
    links: {
        next: string | null
        prev: string | null
    }
    data: Post[]
}
