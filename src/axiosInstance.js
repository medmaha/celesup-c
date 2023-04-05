import axios from "axios"
import jwtDecode from "jwt-decode"
import CSCookies from "./library/cookies"
import CSCryptography from "./library/crypto"

export const CELESUP_BACKEND_URL = process.env.CELESUP_BACKEND_URL

export const celesupBackendApi = axios.create({
    baseURL: CELESUP_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // accept: "cookie",

        // Authorization: "CELESUP <AUTH_TOKEN>",
    },
})

celesupBackendApi.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("ata")
    const refreshToken = localStorage.getItem("atr")

    const abortController = new AbortController()
    config.signal = abortController.signal

    if (accessToken && refreshToken) {
        const decodedToken = jwtDecode(accessToken)
        const expiresAt = decodedToken.exp

        config.headers[
            "Celesup-API"
        ] = `${axios.VERSION}v||${decodedToken.user.id}`

        // Check the expiration date
        const currentTime = Math.floor(Date.now() / 1000)

        if (currentTime > expiresAt) {
            // JWT is expired
            localStorage.removeItem("ata")
            localStorage.removeItem("atr")
            localStorage.removeItem("a-usr")
            await refreshAuthToken(
                decodedToken.user.id,
                refreshToken,
                abortController,
            )
        }
        config.headers["Authorization"] = `Celesup ${localStorage.getItem(
            "ata",
        )}`
    } else if (CSCookies.get("cs-auth_id")) {
        const encodedUserData = localStorage.getItem("a-usr")
        if (!!encodedUserData) {
            const decodedUserData = JSON.parse(
                CSCryptography.decrypt(encodedUserData),
            )
            config.headers[
                "Celesup-API"
            ] = `${axios.VERSION}v||${decodedUserData.id}`
        } else {
            // abortController.abort()
            CSCookies.del("cs-auth_id")
            if (window.location.href === "/auth/login") {
                window.location.reload()
            } else {
                window.location.href = "/auth/login"
            }
        }
    }

    return config
})

async function refreshAuthToken(user_id, refreshToken, abortController) {
    const form = new FormData()
    form.append("refresh", refreshToken)
    form.append("user", user_id)
    const url = CELESUP_BACKEND_URL + "/refresh/auth/tokens"

    return new Promise((resolve) => {
        axios
            .post(url, form, {
                headers: { "Content-type": "application/json" },
            })
            .then((res) => {
                const tokens = {
                    access: res.data.access,
                    refresh: res.data.refresh,
                }
                if (tokens.access && tokens.refresh) {
                    localStorage.setItem("ata", tokens.access)
                    localStorage.setItem("atr", tokens.refresh)
                } else {
                    console.error("invalid tokens")
                    console.log(res.data)
                }
            })
            .catch((error) => {
                // abortController.abort("Invalid auth credentials")
                if (error.response?.status === 401) {
                    window.location.href = "/auth/login/"
                    return
                }
                console.error(error.message)
            })
            .finally(() => {
                resolve()
            })
    })
}

celesupBackendApi.interceptors.response.use(
    (res) => {
        return Promise.resolve(res)
    },
    (err) => {
        if (err.response?.status === 403 || err.response?.status === 401) {
            localStorage.removeItem("a-usr")
            CSCookies.del("cs_auth_id")
            CSCookies.del("cs_auth-val")
            window.location.href = "/auth/login"
        }

        return Promise.reject(err)
    },
)

//? ----------------------------------------------------------------------------------------------------------------------------------
//! ----------------------------------------------------------------------------------------------------------------------------------
//? ----------------------------------------------------------------------------------------------------------------------------------

export const CELESUP_FRONTEND_URL = process.env.CELESUP_FRONTEND_URL
let cancel_2

export const celesupFrontendApi = axios.create({
    baseURL: CELESUP_FRONTEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// celesupFrontendApi.interceptors.request.use((config) => {
//     const cancelToken = axios.CancelToken.source()
//     cancel_2 = cancelToken.cancel
//     config.cancelToken = cancelToken.token
//     return config
// })
// celesupFrontendApi.interceptors.response.use(
//     (response) => {
//         return Promise.resolve(response)
//     },
//     (error) => {
//         if (axios.isCancel(error)) {
//             console.log("Request canceled", error.message)
//         } else {
//             console.log(error)
//         }
//         return Promise.resolve(error)
//     },
// )
