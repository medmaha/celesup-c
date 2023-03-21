import React, { useEffect, useReducer } from "react"
import Icon from "../../../components/UI/Icon"
import RepostModal from "./RepostModal"

import * as Types from "./types/statistics"

type ReducerState = {
    client: {
        liked: boolean
        commented: boolean
        shared: boolean
        saved: boolean
    }
    stats: {
        likesCount: number
        commentsCount: number
        sharesCount: number
        savedCount: number
    }
    actions: {
        repost: boolean
    }
}

function initialState(
    stats: Types.DefaultProps["stats"],
    client: Types.DefaultProps["client"],
): ReducerState {
    return {
        client: {
            liked: client.liked,
            commented: client.commented,
            shared: client.shared,
            saved: client.saved,
        },
        stats: {
            likesCount: stats.likes_count,
            commentsCount: stats.comments_count,
            sharesCount: stats.shares_count,
            savedCount: stats.bookmarks_count,
        },
        actions: {
            repost: false,
        },
    }
}

type ReducerAction = {
    type: "LIKE" | "COMMENT" | "PAYLOAD" | "ACTIONS"
    payload?: ReducerState
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
    switch (action.type) {
        case "LIKE":
            return {
                ...state,
                client: {
                    ...state.client,
                    liked: !state.client.liked,
                },
                stats: {
                    ...state.stats,
                    likesCount: state.client.liked
                        ? state.stats.likesCount - 1
                        : state.stats.likesCount + 1,
                },
            }

        case "PAYLOAD":
            if (action.payload) {
                return {
                    ...action.payload,
                }
            }
        case "ACTIONS":
            if (action.payload) {
                return {
                    ...state,
                    ...action.payload,
                }
            }
        default:
            return state
    }
}

export default function Interactions({
    dispatchPostReducer,
    handlePostLike,
    stats,
    client,
    post_id,
    authorName,
}: Types.DefaultProps) {
    const [state, dispatch] = useReducer(reducer, initialState(stats, client))

    useEffect(() => {
        if (stats) {
            const payload = initialState(stats, client)
            dispatch({ type: "PAYLOAD", payload: payload })
        }
    }, [stats])

    function likePost(ev: any) {
        dispatch({ type: "LIKE" })
        handlePostLike(ev)
    }

    return (
        <div className="interact gap-1 flex justify-between max-w-[90%] md:justify-around items-center mt-3">
            {/* liked */}
            <Button
                iconName={state.client.liked ? "heart" : "heartRegular"}
                color={"red"}
                callback={likePost}
                children={<></>}
                stat={state.stats.likesCount}
                iconClass={state.client.liked ? "fill-red-400" : ""}
            />
            {/* comment */}
            <Button
                iconName="comment"
                color={"blue"}
                callback={() => {
                    dispatchPostReducer({
                        type: "TOGGLE_COMMENT",
                        payload: { data: true },
                    })
                }}
                children={<></>}
                stat={state.stats.commentsCount}
                iconClass={state.client.commented ? "fill-blue-400" : ""}
            />
            {/* shared */}
            <Button
                iconName="share"
                color={"green"}
                callback={() => {
                    dispatch({
                        type: "ACTIONS",
                        payload: {
                            ...state,
                            actions: {
                                repost: !state.actions.repost,
                            },
                        },
                    })
                }}
                children={
                    <>
                        {state.actions?.repost && (
                            <RepostModal
                                setRepost={(action: boolean) => {
                                    dispatch({
                                        type: "ACTIONS",
                                        payload: {
                                            ...state,
                                            actions: {
                                                repost: action,
                                            },
                                        },
                                    })
                                }}
                                post_id={post_id}
                                author={authorName}
                            />
                        )}
                    </>
                }
                stat={state.stats.sharesCount}
                iconClass={state.client.shared ? "fill-green-400" : ""}
            />
            {/* saved */}

            <Button
                callback={() => {}}
                color={"yellow"}
                iconClass={state.client.saved ? "fill-yellow-400" : ""}
                iconName="bookmark"
                stat={state.stats.savedCount}
                children={<></>}
            />
        </div>
    )
}

type Button = {
    iconName: string
    callback: (ev: any) => void
    color: string
    iconClass: string
    stat: number
    children: JSX.Element
    post_id?: string
}

function Button({
    iconName: name,
    callback,
    color,
    iconClass,
    stat,
    children,
}: Button) {
    return (
        <div className="flex flex-col justify-center items-center relative">
            <button
                className={`
                    p-3
                    rounded-full
                    transition
                    cs-interaction-btn
                    hover:bg-opacity-20
                    ${(() => {
                        var _color = ""
                        switch (color) {
                            case "red":
                                _color = "hover:bg-red-500 fill-red-400"
                                break
                            case "blue":
                                _color = "hover:bg-blue-500 fill-blue-400"
                                break
                            case "green":
                                _color = "hover:bg-green-500 fill-green-400"
                                break
                            case "yellow":
                                _color = "hover:bg-yellow-400 fill-yellow-300"
                                break
                            default:
                                break
                        }
                        return _color
                    })()}
                    `}
                onClick={callback}
            >
                <Icon
                    name={name}
                    className={iconClass || "W-[1rem] h-[1rem]"}
                />
            </button>
            <span className=" leading-none h-[1rem]">{stat}</span>
            {children}
        </div>
    )
}
