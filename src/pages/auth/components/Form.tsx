import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Input from "../../../components/UI/Input"
import Button from "../../../components/UI/Button"
import Loading from "../../../components/UI/Loading"
// import Input from "../../components/UI/Input"

interface Props {
    onSubmit: (ev: any, cd: () => void) => void
    submitBtn: string
    header: string | JSX.Element
    signup?: boolean
    login?: boolean
    verification?: boolean
    fields: any[]
    method: "POST"
    reset?: boolean
}

function Form(props: Props): JSX.Element {
    const {
        onSubmit,
        submitBtn,
        header,
        login,
        signup,
        verification,
        reset,
        fields,
        method,
    } = props

    const [validated, setValidated] = useState(false)
    const [pending, togglePending] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        //
    }, [validated])

    function handleFormChange(ev: any) {
        const inputs = ev.currentTarget.querySelectorAll("input")
        let valid = false

        for (const input of inputs) {
            if (input.value.length >= 2) {
                valid = true
            }
            setValidated(valid)
        }
    }

    return (
        <div className="max-w-[400px] w-full relative">
            {pending && (
                <>
                    <div className="absolute top-0 left-0 w-full h-full rounded-md bg-black z-10 cursor-default bg-opacity-30">
                        <Loading text={null} loader="spinner" />
                    </div>
                </>
            )}
            <form
                ref={formRef}
                onSubmit={(ev) => {
                    togglePending(true)
                    onSubmit(ev, () => {
                        formRef.current?.reset()
                        togglePending(false)
                    })
                }}
                method={method.toLowerCase()}
                onChange={handleFormChange}
                className="flex justify-center gap-2 cs-card"
            >
                <div className="w-[90%] flex flex-col gap-[1rem]">
                    <h3 className="text-center text-xl mb-2 tracking-wider cs-text-color">
                        {header}
                    </h3>
                    {[
                        fields.map(({ className, ...rest }, i: number) => (
                            <div className="flex w-full justify-center" key={i}>
                                <Input
                                    className={"py-2 text-lg " + className}
                                    {...rest}
                                />
                            </div>
                        )),
                    ]}
                    <div className="flex justify-end">
                        <Button
                            role="button"
                            text={submitBtn}
                            disabled={!validated}
                            className={`py-2 px-5 rounded-md w-full transition-[background-color] ${
                                validated
                                    ? "bg-primary text-white"
                                    : "tertiary-bg secondary-text"
                            }`}
                        />
                    </div>
                    {login && (
                        <>
                            <div className="flex items-center gap-3 cs-text-color">
                                <div className="border-b w-full max-w-[45%] cs-border"></div>
                                <div className="">OR</div>
                                <div className="border-b w-full max-w-[45%] cs-border"></div>
                            </div>
                            <div className="flex flex-col gap-1 items-center">
                                <Link
                                    href="/auth/password/reset"
                                    className="text-primary cursor-pointer"
                                >
                                    Forgot password?
                                </Link>
                                <div className="pt-3">
                                    <span className="cs-text-muted">
                                        {"Don't"} have an account?{" "}
                                    </span>
                                    <Link
                                        href="/auth/register"
                                        className="text-primary cursor-pointer"
                                    >
                                        <span className="text-semibold">
                                            Sign up
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                    {signup && (
                        <>
                            <div className="flex flex-col gap-1 items-center">
                                <div className="pt-3">
                                    <span className="cs-text-muted">
                                        Already have an account?{" "}
                                    </span>
                                    <Link
                                        href="/auth/login"
                                        className="text-primary cursor-pointer"
                                    >
                                        <span className="text-semibold">
                                            Log in
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                    {verification && (
                        <>
                            <div className="flex flex-col gap-1 items-center">
                                <div className="pt-3">
                                    <span className="cs-text-muted">
                                        {"Didn't"} receive the email?{" "}
                                    </span>
                                    <Link
                                        href="/auth/login"
                                        className="text-primary-light cursor-pointer"
                                    >
                                        <span className="text-semibold">
                                            Resend Code
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                    {reset && (
                        <>
                            <div className="flex items-center gap-3 cs-text-color">
                                <div className="border-b w-full max-w-[45%] cs-border"></div>
                                <div className="opacity-70">OR</div>
                                <div className="border-b w-full max-w-[45%] cs-border"></div>
                            </div>
                            <div className="flex flex-col gap-1 items-center">
                                <Link
                                    href="/auth/register"
                                    className="text-primary cursor-pointer"
                                >
                                    <button>Create a new account</button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    )
}

const _fields: any[] = []

Form.defaultProps = {
    onSubmit: (ev) => {},
    submitBtn: "Submit",
    header: "Form Heading",
    verification: false,
    login: false,
    signup: false,
    fields: _fields,
    method: "POST",
} as Props

export default Form
