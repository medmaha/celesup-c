import { AuthTokens, AuthUser } from "./user"
import {
    ActionCreatorWithPayload,
    PayloadAction,
    Dispatch,
} from "@reduxjs/toolkit"

export type AppMoods = {
    create: false | string
    updateFeeds: false | string
    playingAudio: false | string

    loadingRequest: boolean | string
    errorMessage: boolean | string
    successMessage: boolean | string
    infoMessage: boolean | string
}

interface ActionPayload {
    [key: string]: string
}
export type StoreDispatcher = Dispatch

interface GlobalMethods {
    storeDispatch: StoreDispatcher
    updateAuthUser: ActionCreatorWithPayload<ActionPayload>
    updateAuthTokens: ActionCreatorWithPayload<ActionPayload>
}

export interface GlobalContext extends GlobalMethods {
    user: AuthUser
    tokens: AuthTokens
    activeLink: "home" | "create" | "video" | "notification" | "messages"
    moods: AppMoods
}
