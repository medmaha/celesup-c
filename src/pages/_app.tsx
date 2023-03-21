import LayoutsWrapper from "../layouts/LayoutsWrapper"
import NextJSProgressBar from "nextjs-progressbar"
import "../styles/index.scss"
import { useEffect, useState } from "react"

import Loading from "../components/UI/Loading"

let cachedTimeout: any

export default function App({ Component, pageProps }: any) {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (document.readyState === "complete") {
            if (cachedTimeout) clearTimeout(cachedTimeout)

            cachedTimeout = setTimeout(() => {
                setLoaded(true)
            }, 2500)
        } else if (document.readyState !== "loading") {
            if (cachedTimeout) clearTimeout(cachedTimeout)
            setLoaded(true)
        }
    }, [])

    return (
        <>
            {loaded ? (
                <div className="animate-in">
                    <NextJSProgressBar
                        color="var(--primary)"
                        startPosition={0.4}
                        transformCSS={(css) => {
                            // manipulate css string here

                            return <style>{css}</style>
                        }}
                    />
                    <LayoutsWrapper>
                        <Component {...pageProps} />
                    </LayoutsWrapper>
                </div>
            ) : (
                <div className="w-[100vw] h-[100vh]">
                    <Loading loader="bouncer" />
                </div>
            )}
        </>
    )
}

