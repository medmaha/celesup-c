import { Dispatch, Action } from "@reduxjs/toolkit"
import { AppStore as A, GlobalContext as G } from "../../redux/types"

export type AppStore = A

export interface GlobalContext extends G {
    storeDispatch?: Dispatch
    updateAuthUser?: (payload: any) => any
    updateAuthTokens?: (payload: any) => any
}
