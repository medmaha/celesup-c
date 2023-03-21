import { ReducerAction, ReducerState } from "../../hooks/comments/interface"
import { Author } from "../globalInterface"
import { Post } from "../posts/types/post"

export type Comments = {
    objects_count?: number
    page_index?: number
    page_size?: number
    links: {
        next: string | null
        prev: string | null
    }
    data: CommentInterface[]
}

export interface CommentListPropsInterface {
    comments: Comments
    post: Post
    getComments: () => {}
    updateComments: any
}

export interface CommentInterface {
    id?: string
    new?: boolean
    content?: string
    created_at?: string
    updated_at?: string
    file?: string
    parent?: CommentInterface | null
    replies?: CommentInterface[]
    author?: Author
    likes?: Author[]
    post: Post
}

export interface updateCommentsCallBackInterface {
    type: string
    payload: {
        comment_id?: string
        reply?: CommentInterface
    }
}

export interface CommentPropsInterface {
    data: CommentInterface
    hasNext: boolean
    updateComments: (data: ReducerAction) => {}
}
