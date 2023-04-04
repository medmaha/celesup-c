import React, { useEffect } from "react"
import Form from "../components/Form"

import useAuthAxiosRequests from "../../../hooks/auth/useAuthAxiosRequests"
import { useContext } from "react"
import { GlobalContext } from "../../../layouts/context"
import { updateAuthUser } from "../../../redux/app"
import { AuthUser } from "../../../types/user"
import CSCryptography from "../../../library/crypto"

type Response = ["stage_3", AuthUser]

interface PasswordSignupProps {
    onSubmittedData: (data: Response) => void
}

export default function PasswordSignup({
    onSubmittedData,
}: PasswordSignupProps) {
    const authUser = true
    const { data: response, sendRequest } = useAuthAxiosRequests(authUser)
    const globalContext = useContext(GlobalContext)

    useEffect(() => {
        if (!!response) {
            const user = response.user
            if (user) {
                const prevEncData = JSON.parse(
                    CSCryptography.decrypt(localStorage.getItem("auth")!),
                )

                localStorage.setItem(
                    "auth",
                    CSCryptography.encrypt(
                        JSON.stringify({
                            ...prevEncData,
                            ...user,
                        }),
                    ),
                )
                localStorage.removeItem("cs-auth")
                localStorage.setItem("cs-auth-val", response["cs-auth-val"]!)

                onSubmittedData(["stage_3", user])

                globalContext.storeDispatch(
                    updateAuthUser({
                        user: {
                            ...user,
                        },
                    }),
                )
            }
        }
        // eslint-disable-next-line
    }, [response])

    async function handleFormSubmit(ev: HTMLFormElement, cleanUp: any) {
        ev.preventDefault()

        const form = new FormData(ev.currentTarget)

        const authCredentials = localStorage.getItem("auth")
        if (authCredentials) {
            const decodedCredentials = JSON.parse(
                CSCryptography.decrypt(authCredentials),
            )
            const { email, phone } = decodedCredentials
            if (email) {
                form.append("email", email)
            }
            if (phone) {
                form.append("phone", phone)
            }
        }

        type Headers =
            | {
                  "cs-auth": string
              }
            | {}

        const headers: Headers = (() => {
            const h = (localStorage.getItem("cs-auth") ||
                localStorage.getItem("cs-auth-val")) as string
            if (!h) {
                return {}
            }
            return { "cs-auth": h }
        })()

        await sendRequest({
            url: "/signup",
            data: form,
            headers: {
                ...headers,
            },
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
        <p className="text-sm">Specify a username and password to continue</p>
    </>
)

const fields = [
    {
        type: "text",
        name: "username",
        placeholder: "username",
    },
    {
        type: "password",
        name: "current-password",
        placeholder: "password",
    },
    {
        type: "password",
        name: "confirm-password",
        placeholder: "confirm password",
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
