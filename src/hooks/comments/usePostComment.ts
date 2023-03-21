import React, { useCallback, useEffect, useReducer, useRef } from "react"
import { celesupBackendApi } from "../../axiosInstance"
import { CommentInterface } from "../../apps/comments/interface"

import { ReducerState, ReducerAction } from "./interface"

function initialData(): ReducerState {
    return {
        data: [],
        links: {
            next: null,
            prev: null,
        },
    }
}

export default function usePostComment(post_id: String) {
    const [comments, dispatch] = useReducer(reducer, initialData())
    const commentsRef = useRef(comments)

    useEffect(() => {
        commentsRef.current = comments
    }, [comments])

    const updateComments = useCallback((action: ReducerAction): void => {
        dispatch({ ...action })
    }, [])

    const getComments = useCallback(
        async function () {
            celesupBackendApi
                .get(`comments/${post_id}`)
                .then((res) => {
                    updateComments({
                        type: "INITIALIZE",
                        payload: { data: res.data },
                    })
                })
                .catch((res) => {})
        },
        [post_id, updateComments],
    )

    return { comments, getComments, updateComments }
}

// prettier-ignore
function reducer(state: ReducerState, action: ReducerAction): ReducerState {
    switch (action.type) {
        case "INITIALIZE":
            return {
                ...state,
                ...action.payload.data,
            }
        case "INSERT_NEW_COMMENT":
            if (action.payload.comment){
                return insertToComments(state, action.payload.comment)
            }
            return state
        case "INSERT_NEW_REPLY":
            if (action.payload.comment_id && action.payload.reply){
                    return insertToCommentReplies(
                        state,
                        action.payload.comment_id,
                        action.payload.reply,
                    )
                }
            return state

        default:
            return state
    }
}

// prettier-ignore
function insertToComments(comments:ReducerState, comment:CommentInterface):ReducerState {

    const state = {
        ...comments,
        data: [{ ...comment, new: true }, ...comments.data],
    }    
    return state
}

// prettier-ignore
function insertToCommentReplies(
    comments: ReducerState,
    comment_id: string,
    reply: CommentInterface,
): ReducerState {
    const state = { ...comments }

    
    return state
}
