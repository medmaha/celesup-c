import { createSlice, current } from "@reduxjs/toolkit"
import { type CreateMediaForm } from "./types"

const form = {} as CreateMediaForm

export const CreateMedia = createSlice({
    name: "create",
    initialState: {
        post: {
            form: { ...form },
            pages: {
                prev: null,
                current: null,
                next: null,
            },
        },
        video: {
            form: {},
            pages: {},
        },
    },
    reducers: {
        updatePostForm: (state, action) => {
            if (action.payload.media) {
                state.post.form = {
                    ...state.post.form,
                    media: {
                        ...state.post.form.media,
                        ...action.payload.media,
                    },
                }
            } else if (action.payload.dispatch) {
                state.post.form = { ...form }
            } else {
                state.post.form = {
                    ...state.post.form,
                    ...action.payload,
                }
            }
        },
        updatePostPages: (state, action) => {
            if (action.payload.dispatch) {
                state.post.pages = PAGES
            } else if (action.payload.goBack) {
                state.post.pages = {
                    prev: null,
                    current: state.post.pages.prev,
                    next: state.post.pages.current,
                }
            } else {
                state.post.pages = {
                    ...state.post.pages,
                    ...action.payload,
                }
            }
        },
    },
})

const PAGES = {
    prev: null,
    current: null,
    next: null,
}

export const { updatePostForm, updatePostPages } = CreateMedia.actions
export default CreateMedia.reducer
