import {
    useContext,
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
} from "react"
import { useSelector } from "react-redux"
import { GlobalContext } from "../../../layouts/context"
import { updateMoods } from "../../../redux/app"
import { updatePostForm, updatePostPages } from "../../../redux/create"

// TYPES #typescript
import { Dispatch } from "@reduxjs/toolkit"
import { CreateMediaForm, PostCreateNavigators } from "../../../redux/types"
import {
    InitialConfig,
    ScreenDispatcher,
    PostFormSubmitter,
    PostStore,
} from "./types"

// initializers

import { DefaultConfig, checkFormValidation } from "./utils"
import { AuthUser } from "../../../types/user"

export default function useCreateDispatcher(
    submitPostForm: PostFormSubmitter,
    screenDispatcher: ScreenDispatcher,
    setLoading: (callback: (prev: boolean) => boolean) => void,
    onClose: (callback: () => void) => void,
) {
    const globalContext = useContext(GlobalContext)
    const { storeDispatch } = globalContext

    const [config, setConfig] = useState(DefaultConfig)
    const [validForm, setValidForm] = useState(false)

    const { form, pages } = useSelector((state: PostStore) => state.create.post)

    useEffect(() => {
        setValidForm(checkFormValidation(form))
    }, [form])

    useEffect(() => {
        updateConfigHeaders(validForm, setConfig)
    }, [validForm])

    useEffect(() => {
        if (pages.current) {
            setPageConfiguration(
                form,
                pages,
                setConfig,
                storeDispatch,
                screenDispatcher,
                submitPostForm,
                globalContext.user,
                setLoading,
                onClose,
            )
        }
        // eslint-disable-next-line
    }, [form, pages])

    return {
        config,
    }
}

function updateConfigHeaders(
    validForm: boolean,
    setConfig: (callback: (prev: InitialConfig) => InitialConfig) => void,
): void {
    setConfig((prev) => ({
        ...prev,
        actionBtn: validForm,
    }))
    return
}

function setPageConfiguration(
    form: CreateMediaForm,
    pages: PostCreateNavigators,
    setConfig: (callback: (prev: InitialConfig) => InitialConfig) => void,
    storeDispatch: Dispatch,
    screenDispatcher: ScreenDispatcher,
    submitPostForm: PostFormSubmitter,
    author: AuthUser,
    setLoading: (callback: (prev: boolean) => boolean) => void,
    onClose: (callback: () => void) => void,
): void {
    const METHODS = {
        onCloseBtnClicked: () => {
            function callback() {
                storeDispatch(
                    updateMoods({
                        create: false,
                    }),
                )
                async function dispatchFormData() {
                    const closure = async (): Promise<void> => {
                        return new Promise((resolve) => {
                            if (checkFormValidation(form)) {
                                // Todo --> show dialog to alert ht user that the data would'nt be saved
                            }
                            storeDispatch(updatePostForm({ dispatch: true }))
                            storeDispatch(updatePostPages({ dispatch: true }))
                            localStorage.removeItem("cp")
                            resolve()
                        })
                    }
                    await closure()
                }
                dispatchFormData()
            }
            onClose(callback)
        },
        onActionBtnClicked: () => {
            if (pages.next) {
                screenDispatcher(pages.next)
            } else {
                submitPostForm(form, storeDispatch, author, setLoading, onClose)
            }
        },
        onBackBtnClicked: () => {
            if (pages.prev) {
                screenDispatcher(pages.prev)
                storeDispatch(updatePostPages({ goBack: true }))
            }
        },
    }

    switch (pages.current) {
        case "FORM":
            setConfig((config) => ({
                ...config,
                closeBtn: true,
                backBtn: false,
                editBtn: false,
                seeBtn: false,

                textTitle: "Create post",
                actionText: pages.next ? "Next" : "Create",
                METHODS: {
                    ...config.METHODS,
                    ...METHODS,
                },
            }))

            break
        case "PHOTO":
            setConfig((config) => ({
                ...config,
                closeBtn: false,
                backBtn: true,
                editBtn: true,
                seeBtn: true,
                textTitle: null,
                actionBtn: true,
                actionText: "Preview",
                METHODS: {
                    ...config.METHODS,
                    ...METHODS,
                },
            }))
            break
        case "PREVIEW":
            setConfig((config) => ({
                ...config,
                editBtn: false,
                closeBtn: false,
                backBtn: true,
                seeBtn: false,
                textTitle: "Preview post",
                actionText: "Create",
                METHODS: {
                    ...config.METHODS,
                    ...METHODS,
                },
            }))
            break

        default:
            break
    }
    // const cp = localStorage.getItem("cp")
    // if (cp) {
    //     const pages = JSON.parse(CSCryptography.decrypt(cp))
    // }
}
