export type Author = {
    id: string
    name?: string
    avatar: string
    username: string
}

export type PostStats = {
    likes_count: number
    shares_count: number
    comments_count: number
    bookmarks_count: number
}
export type PostClient = {
    liked: boolean
    commented: boolean
    shared: boolean
    saved: boolean
}

export type PostPicture = {
    width: number
    height: number
    alt_text: string
    url: string
}

export type Post = {
    key: string
    author: Author
    caption?: string
    excerpt?: string
    hashtags?: string
    created_at: string | undefined
    updated_at: string
    video: string
    music: string
    picture?: PostPicture
    client: PostClient
    stats: PostStats
    child: Post
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
