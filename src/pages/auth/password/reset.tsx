import axios, { AxiosError } from "axios"
import Error from "next/error"
import { useRouter } from "next/router"
import { useState } from "react"
import { getErrorMessageFromRequest } from "../../../../utils/getErrorMessageFromResponse"
import { getQueryParamsFromUrl } from "../../../../utils/getQueryParamFromUrl"
import Button from "../../../components/UI/Button"
import Toast from "../../../components/UI/Toast"
import CSToast from "../../../library/toast"
import Form from "../components/Form"

export default function ResetPassword({ linked, auid, stid }: any) {
    const [sent, setSent] = useState("")
    const router = useRouter()

    function submitForm(ev: any, cleanUp: any) {
        ev.preventDefault()
        const baseUrl = process.env.CELESUP_BACKEND_URL!
        const form = new FormData(ev.currentTarget)

        form.append("email", form.get("verified-field")!)
        axios
            .post(baseUrl + "/account/password-reset", form)
            .then((res) => {
                const email = form.get("email")?.valueOf() as string

                if (email) {
                    const emailDomain = (() => {
                        const e = email.split(".")[1]
                        return e
                    })()
                    const emailHost = (() => {
                        const e = email.split("@")[1].split(".")[0].split("")
                        let t = ""
                        for (let i = 0; i < e.length; i++) {
                            const char = e[i]
                            if (i === 0) {
                                t += char
                            } else {
                                t += "*"
                            }
                        }
                        return t
                    })()
                    const emailUserName = (() => {
                        const e = email.split("@")[0].split("")
                        let t = ""
                        for (let i = 0; i < e.length; i++) {
                            const char = e[i]
                            if (i === 0) {
                                t += char
                            } else if (i === e.length - 1) {
                                t += char
                            } else {
                                t += "*"
                            }
                        }
                        return t
                    })()

                    const msg = `We sent an email to ${emailUserName}@${emailHost}.${emailDomain} with a link to get back into your account. Please check your inbox to proceed with this action`
                    setSent(msg)
                } else {
                    setSent(res.data.message)
                }
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    const status = err.response.status
                    if (status === 404) {
                        new CSToast({
                            text: "That address is either invalid or not a verified primary email",
                            autoClose: 10000,
                            className: "bg-red-400",
                        })
                    }
                    return
                }
                if (err.request) {
                    new CSToast({
                        text: "An error occurred\nPlease check your Internet Connection",
                        autoClose: 10000,
                    })
                }
            })
            .finally(() => {
                cleanUp()
            })
    }

    async function submitNewPasswordForm(ev: any, cb: any) {
        ev.preventDefault()
        const form = new FormData(ev.currentTarget)

        const newPassword = form.get("new-password")?.valueOf() as string
        const confirmNewPassword = form
            .get("confirm-new-password")
            ?.valueOf() as string

        if (!newPassword && !confirmNewPassword) {
            alert("Bad Request")
            return
        }

        if (newPassword !== confirmNewPassword) {
            alert("Password Does not match")
            return
        }

        if (newPassword.length < 6) {
            alert("Password too short")
            return
        }

        try {
            const baseUrl = process.env.CELESUP_BACKEND_URL!
            const { data } = await axios.put(
                `${baseUrl}/account/password-reset/change?auid=${auid}&stid=${stid}`,
                form,
            )
            if (data.state === "ok") {
                new CSToast({
                    text: data.message,
                    autoClose: 7000,
                    //  showProgress: false,
                })
                cb()
                router.replace("/auth/login")
            }
        } catch (error: any) {
            const errMsg = getErrorMessageFromRequest(error)
            new CSToast({
                text: errMsg,
                showProgress: false,
            })
        }
    }

    return (
        <div className="flex justify-center w-full mt-[60px]">
            <div className="w-full max-w-[600px]">
                <div className="flex flex-col w-full items-center gap-2 justify-center py-[20px]">
                    {!linked && (
                        <>
                            {!!sent ? (
                                <>
                                    <p className="py-2 px-1 text-center text-base tracking-wide max-w-[380px]">
                                        {sent}
                                    </p>
                                    <div className="">
                                        <Button
                                            onClick={() => {
                                                window.location.href =
                                                    "/auth/password/reset"
                                            }}
                                            text="Okay"
                                            className="rounded-md"
                                        />
                                    </div>
                                </>
                            ) : (
                                <Form
                                    onSubmit={submitForm}
                                    reset={true}
                                    method="POST"
                                    submitBtn="Reset Password"
                                    header={<Heading />}
                                    fields={fields}
                                />
                            )}
                        </>
                    )}
                    {linked && (
                        <>
                            <Form
                                onSubmit={submitNewPasswordForm}
                                submitBtn="Submit"
                                header={
                                    <>
                                        <strong>Create a new password</strong>
                                        <p className="text-sm mt-2">
                                            Enter your user account&apos;s
                                            verified email address and we will
                                            send you a password reset link.
                                        </p>
                                    </>
                                }
                                fields={[
                                    {
                                        type: "password",
                                        name: "new-password",
                                        placeholder: "New password",
                                    },
                                    {
                                        type: "password",
                                        name: "confirm-new-password",
                                        placeholder: "Confirm new password",
                                    },
                                ]}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

const Heading = () => (
    <>
        <b>Trouble logging in?</b>
        <p className="text-sm mt-2">
            Enter your user account&apos;s verified email address and we will
            send you a password reset link.
        </p>
    </>
)

const fields = [
    {
        type: "text",
        name: "verified-field",
        placeholder: "Enter your email or phone",
    },
]

export async function getServerSideProps({ req }: any) {
    const { url } = req

    const queries = getQueryParamsFromUrl(url)

    const { auid, stid } = queries

    if (auid && stid) {
        try {
            const baseUrl = process.env.CELESUP_BACKEND_URL
            const { data } = await axios.get(
                baseUrl + "/users/exists?auid=" + auid,
            )
            if (data.exists) {
                return {
                    props: { linked: true, auid, stid },
                }
            }
        } catch (error: any) {
            console.error(error.message)
        }
    }

    return { props: {} }
}
