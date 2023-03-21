import { useReducer, useEffect, useContext } from "react"
import CSToast from "../../library/toast"
import CSCryptography from "../../library/crypto"
import { getErrorMessageFromRequest } from "../../../utils/getErrorMessageFromResponse"
import { AuthHookAction, AuthHookState, RequestParams } from "./interface"
import axios from "axios"
import jwtDecode from "jwt-decode"
import { GlobalContext } from "../../layouts/context"
import { updateAuthUser } from "../../redux/app"
import { AuthUser } from "../../types/user"

export default function useAuthAxiosRequests(authUser: boolean = false) {
    const [state, dispatchState] = useReducer(reducer, {}, getInitializer)
    const globalContext = useContext(GlobalContext)

    useEffect(() => {
        if (state.error) {
            new CSToast({
                text: state.error,
                autoClose: 5000,
                showProgress: true,
            })
        } else if (state.data) {
            // new CSToast({
            //     text: state.error,
            //     autoClose: 5000,
            //     showProgress: true,
            // })
        }
    }, [state])

    async function sendRequest(options: RequestParams) {
        dispatchState({
            type: "REQUEST_START",
            payload: { ...state },
        })

        const baseURl = process.env.CELESUP_BACKEND_URL

        if (!baseURl) {
            dispatchState({
                type: "REQUEST_FAILED",
                payload: { ...state, error: "Oops! unidentified error" },
            })
            return
        }

        const headers = options.headers || {}

        return new Promise((resolve) => {
            axios
                .post(baseURl + options.url, options.data, {
                    headers,
                })
                .then((res) => {
                    const data = {} as any

                    const tokens = res.data.tokens
                    const session = res.data.session

                    if (tokens) {
                        const accessToken = tokens.access
                        const refreshToken = tokens.refresh
                        localStorage.setItem("ata", accessToken)
                        localStorage.setItem("atr", refreshToken)

                        const decodedUserData = jwtDecode(accessToken) as {
                            user: AuthUser
                        }
                        const encodedUserData = CSCryptography.encrypt(
                            JSON.stringify(decodedUserData.user),
                        )
                        localStorage.setItem("a-usr", encodedUserData)
                        data.tokens = tokens
                    }
                    if (session) {
                        const encodedUserData = CSCryptography.encrypt(
                            JSON.stringify(res.data),
                        )
                        localStorage.setItem("a-usr", encodedUserData)
                        data.session = session
                    }

                    if (data.session && data.tokens) {
                        dispatchState({
                            type: "REQUEST_SUCCEED",
                            payload: { ...state, data: data },
                        })
                        return
                    }

                    dispatchState({
                        type: "REQUEST_SUCCEED",
                        payload: { ...state, data: res.data },
                    })
                })
                .catch((err) => {
                    console.error(err.message)

                    const errMsg = getErrorMessageFromRequest(err)
                    dispatchState({
                        type: "REQUEST_FAILED",
                        payload: { ...state, error: errMsg },
                    })
                    console.log(errMsg)
                })
                .finally(() => {
                    dispatchState({
                        type: "REQUEST_FINISH",
                        payload: {
                            ...state,
                        },
                    })
                    resolve(1)
                })
        })
    }

    const { data, error, pending } = state

    return {
        data,
        error,
        pending,
        sendRequest,
    }
}

function reducer(state: AuthHookState, action: AuthHookAction) {
    switch (action.type) {
        case "REQUEST_START":
            return {
                pending: true,
                error: null,
                data: null,
            }
        case "REQUEST_FINISH":
            return {
                ...state,
                pending: false,
            }
        case "REQUEST_SUCCEED":
            return {
                pending: false,
                error: null,
                data: action.payload.data,
            }
        case "REQUEST_FAILED":
            return {
                pending: false,
                error: action.payload.error,
                data: null,
            }

        default:
            return {
                pending: true,
                error: null,
                data: null,
            }
    }
}

function getInitializer(): AuthHookState {
    return {
        data: null,
        error: null,
        pending: false,
    }
}
