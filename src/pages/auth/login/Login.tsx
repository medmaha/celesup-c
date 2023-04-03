import { useRouter } from "next/router"
import { useContext, useLayoutEffect, useState } from "react"
import { GlobalContext } from "../../../layouts/context"
import Form from "../components/Form"
import useAuthAxiosRequests from "../../../hooks/auth/useAuthAxiosRequests"
import { updateAuthUser } from "../../../redux/app"
import jwtDecode from "jwt-decode"
import Popup from "../../../components/UI/Popup"
import { AuthUser } from "../../../types/user"

export default function Login() {
    const globalContext = useContext(GlobalContext)
    const [developmentNote, setDevelopmentNote] = useState<null | JSX.Element>(
        null,
    )

    const router = useRouter()
    const { data, sendRequest } = useAuthAxiosRequests()

    useLayoutEffect(() => {
        const notified = localStorage.getItem("notify-developmentNote")
        if (!notified) {
            setDevelopmentNote(
                <>
                    <h2 className="font-semibold">Dear Client</h2>
                    <br />
                    <p className="text-center tracking-wide mb-4">
                        Welcome to Celesup Platform! If you're new to our
                        platform, you can easily create a guest account by
                        logging in with any email address that has a domain
                        ending with{" "}
                        <strong title="<username>@guest.com">
                            "@guest.com"
                        </strong>{" "}
                        and using any password. If you prefer to create a full
                        account, you can sign up easily with your email and a
                        secure password.
                    </p>
                    <>Thank you for choosing Celesup Platform.</>
                </>,
            )
        }
    }, [])

    useLayoutEffect(() => {
        if (data) {
            const tokens = data.tokens

            let user
            if (tokens) {
                const decodedToken: { user: AuthUser } = jwtDecode(
                    tokens.access,
                )
                user = decodedToken.user
            } else {
                alert("Something terribly went wrong")
                user = null
            }
            globalContext.storeDispatch(
                updateAuthUser({
                    user: user,
                }),
            )
            router.replace("/")
        }
        // eslint-disable-next-line
    }, [data])

    async function submitForm(ev: any, cleanUp: any) {
        ev.preventDefault()

        const form = new FormData()

        ev.currentTarget.querySelectorAll("input").forEach((element: any) => {
            form.append(element.name, element.value)
        })

        // Todo --> filter formData

        await sendRequest({
            url: "/login",
            data: form,
            headers: {
                "Content-type": "application/json",
            },
        })
        cleanUp()
    }
    return (
        <div className="flex justify-center w-full mt-[60px]">
            {developmentNote && (
                <Popup
                    content={developmentNote}
                    onConfirm={(_, cb) => {
                        localStorage.setItem("notify-developmentNote", "true")
                        setDevelopmentNote(null)
                    }}
                    onClose={() => {
                        setDevelopmentNote(null)
                    }}
                />
            )}
            <div className="w-full max-w-[500px]">
                <div className="flex flex-col items-center gap-2 justify-center py-[20px]">
                    <Form
                        onSubmit={submitForm}
                        login={true}
                        method="POST"
                        submitBtn="Log in"
                        header={<Heading />}
                        fields={fields}
                    />
                </div>
            </div>
        </div>
    )
}

const Heading = () => <b>Sign in to Celesup</b>

const fields = [
    {
        type: "email",
        name: "email",
        placeholder: "email or phone",
    },
    {
        type: "password",
        name: "current-password",
        placeholder: "Password",
    },
]
