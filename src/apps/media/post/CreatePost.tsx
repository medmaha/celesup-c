import React, {
    useCallback,
    useContext,
    useReducer,
    useLayoutEffect,
    createContext,
    useEffect,
    useState,
} from "react"

import { GlobalContext } from "../../../layouts/context"

import { updatePostForm, updatePostPages } from "../../../redux/create"

import fileUploader from "./uploader"

// Components
import PostCreateHeader from "./PostCreateHeader"
import PostCreateFooter from "./PostCreateFooter"

import PostForm from "./text"
import Photo from "./photo"
import Preview from "./preview"
import Loading from "../../../components/UI/Loading"

export const PostContext = createContext({})

type ConfigParams = {
    header: JSX.Element
    footer: JSX.Element
}

interface Params {
    setConfig: (data: ConfigParams) => void
    onClose: (callback: () => void) => void
}

interface ReducerState {
    currentJSX: JSX.Element
    pending?: boolean
}

const initialData = {} as ReducerState

let currentPage: "FORM" | "PHOTO" | "PREVIEW"

export default function CreatePost({ setConfig, onClose }: Params) {
    const globalContext = useContext(GlobalContext)
    const [state, reducerDispatch] = useReducer(reducer, initialData)

    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        localStorage.removeItem("cp")

        setConfig({
            header: (
                <PostCreateHeader
                    dispatcher={dispatcher}
                    setLoading={setLoading}
                    onClose={onClose}
                />
            ),
            footer: (
                <PostCreateFooter dispatcher={dispatcher} uploader={() => {}} />
            ),
        })

        const action = globalContext.moods.create.valueOf()

        switch (action) {
            case "photo":
            case "video":
                uploader(action)

            case "form":
            case "create":
                currentPage = "FORM"
                dispatcher("FORM")
                break
        }

        globalContext.storeDispatch(updatePostForm({ dispatch: true }))
        globalContext.storeDispatch(updatePostPages({ dispatch: true }))

        // return () => {
        //     globalContext.storeDispatch(updateMoods({ updateFeeds: false }))
        //     globalContext.storeDispatch(updateMoods({ create: false }))
        // }
        // eslint-disable-next-line
    }, [])

    const dispatcher = useCallback((type: ReducerAction["type"]) => {
        currentPage = type
        reducerDispatch({ type, payload: { config: setConfig } })
    }, [])

    const uploader = useCallback(
        async (media: "video" | "photo" | "audio") => {
            const [mediaType, fileBuffer] = await fileUploader(media)

            if (mediaType && fileBuffer) {
                const data = {
                    media: {
                        [mediaType]: {
                            url: fileBuffer,
                        },
                    },
                }
                globalContext.storeDispatch(updatePostForm(data))
                dispatcher("PHOTO")
            }

            // eslint-disable-next-line
        },
        [globalContext, dispatcher],
    )

    return (
        <div className="relative max-w-[450px] mx-auto pt-1">
            {loading && (
                <div className="absolute top-0 left-0 w-full h-full z-20">
                    <div className="bg-slate-900 w-full h-full p-2 bg-opacity-90 rounded-lg">
                        <Loading text="Creating post" loader="spinner" />
                    </div>
                </div>
            )}
            <>{state.currentJSX}</>
        </div>
    )
}

interface ReducerAction {
    type: "FORM" | "PHOTO" | "PREVIEW"
    payload: {
        config: Params["setConfig"]
        pending?: boolean
    }
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
    switch (action.type) {
        case "FORM":
            return {
                ...state,
                currentJSX: getCurrentJsx(PostForm),
            }
        case "PHOTO":
            return {
                ...state,
                currentJSX: getCurrentJsx(Photo, action.payload.config),
            }
        case "PREVIEW":
            return {
                ...state,
                currentJSX: getCurrentJsx(Preview),
            }
        // case "VIDEO":
        //     return {
        //         currentJXS: getCurrentJsx(VideoFileViewer),
        //     }
        // case "EDITOR":
        //     return {
        //         currentJXS: getCurrentJsx(PhotoEditor),
        //     }

        default:
            return state
    }
}

export function getCurrentJsx(Element: any, config?: Params["setConfig"]) {
    return <Element setConfig={config} />
}
