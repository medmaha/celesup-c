import { NextPageContext } from "next"
import { useEffect, useState } from "react"
import Account from "../apps/account"
import { useRouter } from "next/router"

type Props = {
    username: string
}

export default function ProfileAccount({ username }: Props) {
    const [account, setAccount] = useState<string | null>(null)

    const router = useRouter()

    function handleRoute(url: string, { shallow }: any) {
        if (url.split("/").length <= 2) {
            const user = url.replace("/", "")
            setAccount(user)
        }
    }

    useEffect(() => {
        router.events.on("routeChangeStart", handleRoute)
        return () => {
            router.events.off("routeChangeStart", handleRoute)
        }
    }, [router])

    useEffect(() => {
        setAccount(username)
    }, [username])

    if (account) return <Account username={account!} />

    return <></>
}

export function getServerSideProps(ctx: NextPageContext) {
    const { account } = ctx.query

    return {
        props: {
            username: account,
        },
    }
}
