import { AuthTokens, AuthUser } from "../../types/user"

export interface AuthHookState {
    data: Response | null
    error: string | null
    pending: boolean
}

export interface CredentialsResponse {
    message?: string
    email?: string
    phone?: string
    valid?: boolean
}

export interface Response {
    user: AuthUser
    credentials?: CredentialsResponse
    "cs-auth"?: string
    "cs-auth-val"?: string
    tokens: {
        access: string
        refresh: string
    }
}

// prettier-ignore
type RequestActionsState = "REQUEST_START"| "REQUEST_FINISH"| "REQUEST_SUCCEED"| "REQUEST_FAILED"

export interface AuthHookAction {
    type: RequestActionsState
    payload: AuthHookState
}

export interface RequestParams {
    url: string
    data?: FormData | { [x: string]: string }
    headers?: { [key: string]: string }
}
