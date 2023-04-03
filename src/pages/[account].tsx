import { NextPageContext } from "next"
import { useEffect, useState } from "react"
import Account from "../apps/account"

type Props = {
    username: string
}

export default function ProfileAccount({ username }: Props) {
    const [account, setAccount] = useState<string | null>(null)

    useEffect(() => {
        setAccount(username)
    }, [username])

    if (account) return <Account username={account} />

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
