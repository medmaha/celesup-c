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
        if (localStorage.getItem("a-usr") && localStorage.getItem("ata")) {
            authenticate()
        } else {
            unAuthenticate()
            setPending(false)
        }
    }, [])

    function unAuthenticate() {
        localStorage.removeItem("atr")
        localStorage.removeItem("ata")
        localStorage.removeItem("a-usr")
        router.replace("/auth/login")
    }

    async function authenticate() {
        setPending(true)
        try {
            const res = await celesupBackendApi.get("/authenticate")
            const data: AuthUser = res.data
            if (data.id) {
                console.log(data)
                setData(data)
            } else {
                throw new Error()
            }
        } catch (error) {
            unAuthenticate()
        }
        setPending(false)
    }

    return { authData, authPending }
}
