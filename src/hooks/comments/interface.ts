import {
    Comments,
    CommentInterface,
    updateCommentsCallBackInterface,
} from "../../apps/comments/interface"

import { UserInterface } from "../../apps/globalInterface"

export interface ReducerAction {
    type: "INITIALIZE" | "INSERT_NEW_COMMENT" | "INSERT_NEW_REPLY"
    payload: {
        comment_id?: string
        comment?: CommentInterface
        data?: ReducerState
        reply?: CommentInterface | null
    }
}

export interface ReducerState extends Comments {
    noData?: boolean
}
