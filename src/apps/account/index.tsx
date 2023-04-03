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
    const router = useRouter()

    async function getProfile() {
        const form = new FormData()
        const identifier = getProfileIdentifier()
        if (identifier) {
            form.append("username", identifier)
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

            //   url: "/profile/view",
            // method: "POST",
            // form: form,
        }
    }

    useEffect(() => {
        getProfile()
    }, [username])

    function getProfileIdentifier() {
        return username
    }

    if (profile) return <Profile data={profile} />

    return <PreRender />
}
