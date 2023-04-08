import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { celesupBackendApi } from "../../axiosInstance"
import CSCryptography from "../../library/crypto"
import { AuthUser } from "../../types/user"
import jwtDecode from "jwt-decode"

export default function useAuthenticated(user: AuthUser) {
    const router = useRouter()

    const [authData, setData] = useState<AuthUser | null>(null)
    const [authPending, setPending] = useState<boolean>(true)

    function auth(path: string) {
        const __auth = isAuthenticated(path)

        if (__auth === true) {
            let encryptedUserData = localStorage.getItem("a-usr")
            if (!!Object.keys(user || {}).length) {
                setData(user)
            } else if (encryptedUserData) {
                const decryptedUserData = JSON.parse(
                    CSCryptography.decrypt(encryptedUserData),
                )
                setData(decryptedUserData)
            } else {
                const decodedJwtToken: { user: AuthUser } = jwtDecode(
                    localStorage.getItem("ata")!,
                )
                setData(decodedJwtToken.user)

                const encryptedUserData = CSCryptography.encrypt(
                    JSON.stringify(decodedJwtToken.user),
                )
                localStorage.setItem("a-usr", encryptedUserData)
            }
            setPending(false)
        } else if (__auth === "auth") {
            setData(null)
            unAuthenticate()
        } else {
            setPending(false)
            router.replace("/auth/login")
        }
    }

    useEffect(() => {
        const currentPath = window.location.href
        auth(currentPath)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        router.events.on("routeChangeStart", auth)
        return () => {
            router.events.off("hashChangeStart", auth)
        }
        // eslint-disable-next-line
    }, [])

    function unAuthenticate() {
        localStorage.removeItem("atr")
        localStorage.removeItem("ata")
        localStorage.removeItem("a-usr")
        setPending(false)
    }

    function isAuthenticated(path: string): false | true | "auth" {
        const authRoutes = path.match(/\/auth\//g)
        const authPersistence = !!localStorage.getItem("ata")

        if (authPersistence) {
            if (authRoutes) {
                router.replace("/")
            }
            return true
        }

        if (authRoutes) return "auth"

        return false
    }

    async function authenticate() {
        setPending(true)
        celesupBackendApi
            .get("/authenticate")
            .then((res) => {
                const encryptedUserData = CSCryptography.encrypt(
                    JSON.stringify(res.data),
                )
                localStorage.setItem("a-usr", encryptedUserData)
                setData(res.data)
            })
            .catch((err) => {
                console.error(err)

                // const errMsg = getErrorMessageFromRequest(err)
                // setError(errMsg)
            })
            .finally(() => {
                setPending(false)
            })
    }

    return { authData, authPending }
}
