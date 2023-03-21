import { ReactNode } from "react"

export type DefaultProps = {
    state: {
        currentJsx: ReactNode
    }
}

export interface ReducerState {
    currentJXS?: ReactNode
}
export interface ReducerAction {
    type: "PHOTO" | "FORM" | "VIDEO" | "PREVIEW" | string
    payload?: { config: any }
}
