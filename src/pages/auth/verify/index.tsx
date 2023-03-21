import Link from "next/link"
import { useContext, useLayoutEffect, useState } from "react"
import Form from "../components/Form"

import CSCryptography from "../../../library/crypto"
import { celesupBackendApi } from "../../../axiosInstance"
import Popup from "../../../components/UI/Popup"

import useAuthAxiosRequest from "../../../hooks/auth/useAuthAxiosRequests"
import Toast from "../../../library/toast"
import { GlobalContext } from "../../../layouts/context"
import { CredentialsResponse } from "../../../hooks/auth/interface"
import axios from "axios"
import { useRouter } from "next/router"
import jwtDecode from "jwt-decode"
import { updateAuthUser } from "../../../redux/app"
import { AuthUser } from "../../../types/user"

type CipherText = string
type AuthUserData = {
    cipher: CipherText
}

export default function VerifyAccount() {
    const [decryptedData, setDecryptedData] = useState<CredentialsResponse>()
    const { data, sendRequest } = useAuthAxiosRequest()
    const [showPopup, setShowPopup] = useState(false)
    const globalContext = useContext(GlobalContext)

    const router = useRouter()

    useLayoutEffect(() => {
        const auth = localStorage.getItem("auth")
        let state
        if (auth) {
            state = JSON.parse(CSCryptography.decrypt(auth))
            console.log(state)
        }

        if (state && Object.keys(state).length > 1) {
            const __data = { valid: true } as any
            let valid = false

            if (state.email) {
                __data["email"] = state.email
                valid = true
            }
            if (state.phone) {
                __data["phone"] = state.email
                valid = true
            }
            if (!valid) {
                __data["valid"] = false
            }

            setDecryptedData(__data)
        } else {
            router.replace("/auth/register")
        }
    }, [])

    useLayoutEffect(() => {
        if (data) {
            const __data = data as any
            const message = __data?.message
            const tokens = __data.tokens
            const session = __data.session

            let user: any
            if (tokens) {
                const decodedToken = jwtDecode(tokens.access) as {
                    user: AuthUser
                }
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
            new Toast({
                text: message,
                autoClose: 5000,
            })
            setTimeout(() => {
                localStorage.removeItem("auth")
                localStorage.removeItem("cs-auth")
                localStorage.removeItem("cs-auth-val")
                router.replace("/")
            }, 5000)
        }
    }, [data])

    useLayoutEffect(() => {
        const data = decryptedData as any
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

        if (data && data.valid) {
            if (Object.keys(data).length > 0) {
                const baseUrl = process.env.CELESUP_BACKEND_URL!
                axios
                    .get(baseUrl + "/account/verify", { headers })
                    .then((res) => {
                        localStorage.setItem(
                            "cs-auth-val",
                            res.data["cs-auth-val"],
                        )
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            } else alert("Unauthorize")
        }
    }, [decryptedData])

    function handleFormSubmit(ev: any) {
        ev.preventDefault()
        const code = ev.target["code"]

        const url = "/account/verify"
        const form = new FormData(ev.currentTarget)

        code.value = ""

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

        sendRequest({
            url,
            data: form,
            headers,
        })
    }

    return (
        <div className="flex justify-center w-full mt-[50px]">
            <div className="w-full max-w-[500px]">
                <div className="flex flex-col items-center gap-2 justify-center py-[20px]">
                    <Form
                        onSubmit={handleFormSubmit}
                        verification={true}
                        method="POST"
                        submitBtn="Submit Code"
                        fields={fields}
                        header={
                            <Heading
                                field={
                                    decryptedData?.email
                                        ? "Email address"
                                        : "Phone number"
                                }
                                value={
                                    decryptedData
                                        ? decryptedData.email ||
                                          decryptedData.phone
                                        : ""
                                }
                            />
                        }
                    />
                    <div className="mt-2">
                        <Link
                            href="/auth/signup"
                            className="text-primary px-2 pb-[2px] border-b border-1 border-[var(--primary)]"
                            replace={true}
                            onClick={(ev) => {
                                ev.preventDefault()
                                setShowPopup(true)
                            }}
                        >
                            Change my email
                        </Link>
                    </div>
                </div>
            </div>
            {showPopup && (
                <Popup
                    // content={
                    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, incidunt?"
                    // }
                    onClose={() => setShowPopup(false)}
                    onConfirm={(config: any, cb: (ev: any) => any) => {
                        const content = (
                            <div className="w-full text-left my-2 text-slate-800">
                                <label
                                    htmlFor="email"
                                    className="font-bold flex items-center gap-2"
                                >
                                    Email address{" "}
                                    <span
                                        className="text-primary cursor-default"
                                        title="required"
                                    >
                                        *
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    id="email"
                                    name="email"
                                    className="w-full h-[50px] bg-slate-400 text-slate-800
                                    rounded-md border-0 outline-1 outline-slate-600 focus:outline-[var(--primary)]
                                    transition focus:outline focus:outline-2 placeholder:text-slate-800 px-3"
                                    placeholder={"email address"}
                                />
                                <div className="flex justify-end w-full mt-[0.10rem]">
                                    <button
                                        className=" text-secondary-dark cursor-pointer pb-[1px] px-1 border-0
                                        border-[var(--secondary-dark)] border-b-[1px]"
                                    >
                                        use Phone instead
                                    </button>
                                </div>
                            </div>
                        )
                        config.content = content
                        cb({ ...config })
                    }}
                />
            )}
        </div>
    )
}

const Heading = ({ field, value }: { field: any; value: any }) => (
    <>
        <b>Verify Your Email</b>
        <p className="text-sm">
            {"We've "} sent a confirmation code to the {field}
            <span className="text-secondary">
                {' "'}
                {value}
                {'" '}
            </span>
            you provided.
        </p>
    </>
)

// We sent an email to inmaha33@gmail.com
// To continue, please check your email and verify your account
// Please enter the verification code we sent to <+2203332050>

const fields = [
    {
        type: "text",
        name: "code",
        placeholder: "CODE",
        className: "text-center px-2 max-w-[130px] tracking-wider semibold",
        onKeyDown: (ev: any) => {
            if (ev.key.length === 1) {
                if (ev.key.match(/[0-9]/g || ev.code.match(/igit[0-9]/g))) {
                } else {
                    ev.preventDefault()
                }
            }
        },
        onChange: (ev: any) => {
            if (ev.target.length === 5) {
                ev.preventDefault()
                // ev.target.closest('form').submit()
            }
        },
        autoComplete: "Off",
    },
]
