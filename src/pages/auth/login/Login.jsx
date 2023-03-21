import { useRouter } from "next/router"
import { useContext, useLayoutEffect } from "react"
import { GlobalContext } from "../../../layouts/context"
import Form from "../components/Form"
import useAuthAxiosRequests from "../../../hooks/auth/useAuthAxiosRequests"
import { updateAuthUser } from "../../../redux/app"
import jwtDecode from "jwt-decode"

//
export default function Login() {
    const globalContext = useContext(GlobalContext)
    const router = useRouter()
    const { data, sendRequest } = useAuthAxiosRequests()

    useLayoutEffect(() => {
        if (data) {
            const tokens = data.tokens
            const session = data.session

            let user
            if (tokens) {
                const decodedToken = jwtDecode(tokens.access)
                user = decodedToken.user
            }
            if (session) {
                user = session.user
            }
            if (!tokens && !session) {
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

    async function submitForm(ev) {
        ev.preventDefault()

        const form = new FormData()

        ev.currentTarget.querySelectorAll("input").forEach((element) => {
            form.append(element.name, element.value)
        })

        // Todo --> filter formData

        sendRequest({
            url: "/login",
            data: form,
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
        })
    }
    return (
        <div className="flex justify-center w-full mt-[60px]">
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
        name: "password",
        placeholder: "Password",
    },
]
