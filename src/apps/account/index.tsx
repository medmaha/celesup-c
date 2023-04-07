import { useEffect, useState } from "react"
import { celesupBackendApi } from "../../axiosInstance"
import { AuthUserProfile } from "./types"
import PreRender from "./PreRender"
import Profile from "./Profile"
import { useRouter } from "next/router"

type Props = {
    username: string
}

export default function Account({ username }: Props) {
    const [profile, setProfile] = useState<AuthUserProfile | null>(null)

    async function getProfile(name: string) {
        const form = new FormData()
        if (name) {
            form.append("username", name)
            try {
                const { data } = await celesupBackendApi({
                    url: "/profile/view",
                    method: "post",
                    data: form,
                })
                setProfile(data)
            } catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        getProfile(username)
    }, [username])

    if (profile) return <Profile data={profile} />

    return <PreRender />
}
