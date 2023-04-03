import React, { useEffect, useRef, useState } from "react"

type Props = {
    autoOpen: boolean
    onClose: () => void
    onConfirm: (config: any, callback: (config: any) => void) => void
    content: string
}

export default function Popup(props: Props) {
    const popupRef = useRef(document.createElement("div"))
    const [config, updateConfig] = useState({ ...props, popupRef })

    const { autoOpen, content, onConfirm, onClose } = config

    useEffect(() => {
        updateConfig((prev: any) => ({ ...prev, popupRef }))
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {autoOpen && (
                <div
                    ref={popupRef}
                    className="fixed inset-0 flex items-center justify-center p-6"
                >
                    <div className="bg-slate-300 w-full max-w-[400px] rounded-lg p-6 flex flex-col gap-4 outline-2 outline-red-400 outline">
                        <p className="max-w-[350px] text-slate-800 text-center tracking-wide">
                            {content}
                        </p>
                        <div className="mt-2 flex gap-4 justify-end">
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                                onClick={() => {
                                    function cb(config: any) {
                                        updateConfig({ ...config })
                                    }
                                    onConfirm(config, cb)
                                }}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

Popup.defaultProps = {
    autoOpen: true,
    onClose: () => {},
    onConfirm: (config: any) => {},
    content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, incidunt?",
}
