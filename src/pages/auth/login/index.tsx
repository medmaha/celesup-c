import { useRouter } from "next/router"
import { useEffect, useLayoutEffect, useState } from "react"
import Login from "./Login"

export default function Index() {
    const [loaded, toggleLoaded] = useState(false)
    const router = useRouter()

    async function changeRoute(route = "/") {
        await router.replace(route)
    }

    useLayoutEffect(() => {
        if (
            localStorage.getItem("ata") &&
            localStorage.getItem("atr") &&
            localStorage.getItem("a-usr")
        ) {
            changeRoute()
        } else {
            localStorage.removeItem("ata")
            localStorage.removeItem("atr")
            localStorage.removeItem("a-usr")
            toggleLoaded(true)
        }
    }, [])

    if (!loaded) return <></>
    return <Login />
}
