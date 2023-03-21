import { useEffect } from "react"
import Form from "../components/Form"
import useAuthAxiosRequests from "../../../hooks/auth/useAuthAxiosRequests"

import { CredentialsResponse } from "../../../hooks/auth/interface"
import CSCryptography from "../../../library/crypto"

type Response = ["stage_2", CredentialsResponse]

type EmailSignupProps = {
    onSubmittedData: (data: Response) => void
}

export default function EmailSignup({ onSubmittedData }: EmailSignupProps) {
    const { data, sendRequest } = useAuthAxiosRequests()

    useEffect(() => {
        if (data) {
            const authCookie = data["cs-auth"]
            if (authCookie) {
                localStorage.setItem("cs-auth", authCookie)
            }
            const credentials = data.credentials
            if (credentials) {
                const encodedCredentials = CSCryptography.encrypt(
                    JSON.stringify(credentials),
                )
                localStorage.setItem("auth", encodedCredentials)
                onSubmittedData(["stage_2", credentials])
            }
        }
        // eslint-disable-next-line
    }, [data])

    async function handleFormSubmit(ev: any, cleanUp: any) {
        ev.preventDefault()
        const form = new FormData(ev.currentTarget)

        form.append("initial", "1")

        await sendRequest({
            url: "/signup",
            data: form,
        })
        cleanUp()
    }
    return (
        <div className="flex justify-center w-full mt-[50px]">
            <div className="w-full max-w-[500px]">
                <div className="flex flex-col items-center gap-2 justify-center py-[20px]">
                    <Form
                        onSubmit={handleFormSubmit}
                        signup={true}
                        method="POST"
                        submitBtn="Sign up"
                        fields={fields}
                        header={<Heading />}
                    />
                </div>
            </div>
        </div>
    )
}

const Heading = () => (
    <>
        <b>Join Celesup Today</b>
        <p className="text-sm">It’s quick and easy</p>
    </>
)

const fields = [
    {
        type: "email",
        name: "email",
        placeholder: "Phone or email",
    },
]

export async function getServerSideProps(ctx: any) {
    const isAuthenticated = ctx.req.cookies["cs-csrkKey"]

    if (isAuthenticated) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
                // statusCode: 301,
            },
        }
    }
    return {
        redirect: {
            destination: "/auth/register",
            permanent: false,
            // statusCode: 301,
        },
    }
}
