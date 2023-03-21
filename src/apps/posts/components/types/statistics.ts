import { PostClient, PostStats, Post } from "../../types/post"

type Dispatcher = {
    type: string
    payload: any
}

export type DefaultProps = {
    stats: PostStats
    client: PostClient
    post_id: string
    handlePostLike: (ev: any) => void
    dispatchPostReducer: (action: Dispatcher) => void
    authorName: string
}
