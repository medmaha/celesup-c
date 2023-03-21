import { useState, useLayoutEffect } from "react"
import { Router, useRouter } from "next/router"
import CSCookie from "../../src/library/cookies"
import { celesupBackendApi } from "../../src/axiosInstance"
import type { AuthUser } from "../../src/types/user"

export default async function useAuthenticated(user: AuthUser) {
    const router = useRouter()

    // const {data, pending, error} = useReducer(reducer,{data:null, pending:null, error:null})

    const [authData, setData] = useState<AuthUser>({
        id: "",
        name: "",
        avatar: "",
        username: "",
    })
    const [authPending, setPending] = useState<boolean>(true)

    useLayoutEffect(() => {
        authenticate()
        // if (cookies.get("cs-csrfkey") || cookies.get("cs-auth-val")) {
        // authenticate()
        //     return
        // } else {
        //     setPending(false)
        //     router.replace("/auth/login")
        // }
    }, [])

    async function authenticate() {
        setPending(true)
        try {
            const res = await celesupBackendApi.get("/authenticate")
            const data: AuthUser = res.data
            setData(data)
        } catch (error) {
            // const errMsg = getErrorMessageFromRequest(error)
            // setError(errMsg)
        }
        setPending(false)
    }

    return { authData, authPending }
}
