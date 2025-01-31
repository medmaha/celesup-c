import { createContext, useEffect, useState } from "react"
import {
    updateAuthUser,
    updateAuthTokens,
    updateMoods,
    updateActiveLink,
} from "../redux/app"
import { useDispatch, useSelector } from "react-redux"
import useAuthenticate from "./hooks/useAuthenticate"

import { Create } from "../apps/media"

import { AppContext } from "../main/global"
import { GlobalContext, StoreDispatcher } from "../types/global"
import { AppStore } from "../redux/types"

const initialValues = { ...AppContext } as GlobalContext

const GlobalContext = createContext(initialValues)

interface Props {
    children: JSX.Element
}

function ContextProvider({ children }: Props): JSX.Element {
    const { user, tokens, moods } = useSelector((state: AppStore) => state.main)

    const { authData, authPending } = useAuthenticate(user)

    const storeDispatch: StoreDispatcher = useDispatch()

    useEffect(() => {
        storeDispatch(updateMoods({ loaded: authPending === false }))
    }, [authPending])

    useEffect(() => {
        if (authData?.id) {
            storeDispatch(updateAuthUser({ user: authData }))
        } else {
            storeDispatch(updateAuthUser({ user: null }))
        }
        // eslint-disable-next-line
    }, [authData])

    const contextValues = {
        ...initialValues,
        user,
        tokens,
        moods,
        storeDispatch,
        updateAuthUser,
        updateAuthTokens,
    }
    return (
        <GlobalContext.Provider value={{ ...contextValues }}>
            {!authPending && (
                <>
                    {children}
                    {moods.create && <Create />}
                </>
            )}
        </GlobalContext.Provider>
    )
}

ContextProvider.defaultProps = {
    children: <></>,
}

export { GlobalContext }
export default ContextProvider
