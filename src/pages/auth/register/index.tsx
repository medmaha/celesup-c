import { Reducer, useLayoutEffect, useReducer } from "react"
import EmailSignup from "./EmailSignup"
import PasswordSignup from "./PasswordSignup"
import { useRouter } from "next/router"

import CSCryptography from "../../../library/crypto"
import { CredentialsResponse } from "../../../hooks/auth/interface"
import { AuthUser } from "../../../types/user"

type CallBackParams = ["stage_2", CredentialsResponse] | ["stage_3", AuthUser]

const initialState = {
    stage: 1,
    data: null,
}

export default function Register() {
    // const [state, dispatchStates] = useReducer(reducer, initialState)
    const [state, dispatchStates] = useReducer(reducer, initialState)

    const router = useRouter()

    useLayoutEffect(() => {
        if (state.data === "redirect") {
            // const emailOrPhone = state.prev.email ? "email" : "phone"
            // const encryptEmailOrPhone = CSCryptography.encrypt(emailOrPhone)

            // const emailOrPhoneValue = state.prev.email || state.prev.phone
            // const encryptEmailOrPhoneValue =
            //     CSCryptography.encrypt(emailOrPhoneValue)

            // localStorage.setItem(
            //     "auth",
            //     JSON.stringify({
            //         key: encryptEmailOrPhone,
            //         value: encryptEmailOrPhoneValue,
            //     }),
            // )

            router.replace({
                pathname: state.redirect,
            })
        }
        // eslint-disable-next-line
    }, [state])

    const onSubmittedData = (params: CallBackParams) => {
        const [stage, response] = params
        dispatchStates({
            type: stage,
            payload: { data: response },
        })
    }

    return (
        <div className="flex justify-center w-full mt-[10px]">
            <div className="w-full max-w-[500px]">
                <div className="flex flex-col items-center gap-2 justify-center py-[20px]">
                    {state.stage === 1 ? (
                        <EmailSignup onSubmittedData={onSubmittedData} />
                    ) : (
                        <PasswordSignup onSubmittedData={onSubmittedData} />
                    )}
                </div>
            </div>
        </div>
    )
}

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
        props: {}, // will be passed to the page component as props
    }
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case "stage_2":
            return {
                ...state,
                stage: 2,
                data: action.payload.data,
            }
        case "stage_3":
            return {
                ...state,
                prev: state.data,
                data: "redirect",
                redirect: "/auth/verify",
            }
        default:
            state
    }
}
