import { Dispatch } from "@reduxjs/toolkit"
import type {
    CreateMedia,
    CreateMediaForm,
    PostCreateNavigators,
} from "../../../../redux/types"
import { AuthUser } from "../../../../types/user"

export type PostStore = {
    create: {
        post: {
            form: CreateMediaForm
            pages: PostCreateNavigators
        }
    }
}

export interface InitialConfig {
    seeBtn: string | boolean
    editBtn: string | boolean
    backBtn: string | boolean
    closeBtn: string | boolean
    actionBtn: boolean
    actionText: string
    textTitle: string | null

    METHODS: {
        // onBackBtnClicked: (ev: React.DOMAttributes<HTMLButtonElement>) => void
        onBackBtnClicked: (ev: any) => void
        onEditBtnClicked: (ev: any) => void
        onCloseBtnClicked: (ev: any) => void
        onActionBtnClicked: (ev: any) => void
        onDefaultBtnClicked: (ev: any) => void
    }
}

export interface PostFormSubmitter {
    (
        form: CreateMediaForm,
        dispatcher: Dispatch,
        author: AuthUser,
        setLoading: (callback: (prev: boolean) => boolean) => void,
        onClose: (callback: () => void) => void,
    ): Promise<void>
}

export interface ScreenDispatcher {
    (data: "PHOTO" | "FORM" | "PREVIEW"): void
}
