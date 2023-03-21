import { useCallback, useEffect, useRef, useState } from "react"

import Modal from "../../components/UI/Modal"

// ? Post Components
import CreatePost from "./post/CreatePost"

type Props = {
    onClose?: () => {}
}

type ConfigParams = {
    header: JSX.Element
    footer: JSX.Element
}

let closeTimeout: NodeJS.Timeout
let cachedCallback: any

export default function Create() {
    const [modalConfig, updateModalConfig] = useState<ConfigParams>({
        header: <></>,
        footer: <></>,
    })

    const [closeModal, setCloseModal] = useState(false)

    const createMediaRef = useRef(document.createElement("div"))

    function onClose(callback: () => void) {
        cachedCallback = callback
        setCloseModal(true)
    }

    function handleModalClose() {
        if (cachedCallback) cachedCallback()
    }

    const setConfig = useCallback((data: ConfigParams) => {
        return updateModalConfig((prev) => {
            return {
                ...prev,
                ...data,
            }
        })
    }, [])

    return (
        <div ref={createMediaRef} className="">
            <Modal
                onClose={handleModalClose}
                close={closeModal}
                options={{}}
                headerContent={false}
                jsxHeaderContent={modalConfig.header || <></>}
                jsxFooterContent={modalConfig.footer || null}
                jsxContent={
                    <CreatePost setConfig={setConfig} onClose={onClose} />
                }
            />
        </div>
    )
}
