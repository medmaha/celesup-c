import { useContext, useEffect } from "react"
import { useRouter } from "next/router"

import { GlobalContext } from "../layouts/context"

import FeedsContainer from "../feeds"

export default function Index({ user: data, tokens }) {
    const globalContext = useContext(GlobalContext)
    const router = useRouter()

    return (
        <>
            <FeedsContainer />
            <div id="test"></div>
        </>
    )
}

