import Image from "next/image"
import React, { useCallback, useEffect, useRef, useState } from "react"
import Button from "./Button"

let errorTimeout: NodeJS.Timeout
var closeTimeout: NodeJS.Timeout

function calculateTimeout(errorTimeout: any, modal: any) {
    errorTimeout = setTimeout(() => {
        modal.classList.remove("cs-shake-card")
    }, 800)
}

export default function Modal(props: any) {
    const [isOpen, setIsOpen] = useState(false)

    return <ModalContent {...props} />
}

function ModalContent({
    title,
    content,
    onClose,
    showLogo,
    jsxContent,
    headerContent,
    jsxHeaderContent,
    jsxFooterContent,
    actionBtnText,
    onActionClicked,
    close,
}: any) {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const modal = modalRef.current?.querySelector("#cs-modal")
        if (modal) {
            modal.classList.add("open")
        }
        if (close) {
            if (modal) {
                modal.classList.add("close")

                closeTimeout = setTimeout(() => {
                    onClose()
                }, 320)
            }
        }
    }, [close])

    const handleDocumentClick = useCallback((ev: any) => {
        const modal = modalRef.current?.querySelector("#cs-modal")

        if (ev.target === modal || ev.target.closest("#cs-modal")) return

        clearTimeout(errorTimeout)

        if (modal) {
            modal.classList.add("cs-shake-card")
            calculateTimeout(errorTimeout, modal)
        }
    }, [])

    useEffect(() => {
        var timeout: NodeJS.Timeout = setTimeout(() => {
            document.body.style.overflow = "hidden"
            document.addEventListener("click", handleDocumentClick)
        }, 300)

        return () => {
            clearInterval(timeout)
            document.removeEventListener("click", handleDocumentClick)
            document.body.style.overflow = "auto"
        }
    }, [handleDocumentClick])

    function closeModal() {
        const modal = modalRef.current?.querySelector("#cs-modal")

        if (modal) {
            modal.classList.add("close")
        }
        clearTimeout(closeTimeout)
        closeTimeout = setTimeout(transitionEnd, 320)
    }

    function transitionEnd() {
        onClose(modalRef.current)
    }

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 flex items-center justify-center z-[100] top-0"
        >
            <div className="bg-transparent backdrop-blur-[3px] w-full p-3 pt-[65px] h-full flex items-center justify-center">
                <div
                    id="cs-modal"
                    className="cs-modal w-full min-h-[450px] h-max bg-0 p-0 max-w-[600px] rounded-xl secondary-bg shadow shadow-black"
                >
                    <div className="">
                        {showLogo && (
                            <div className="max-h-[45px] py-auto w-full relative">
                                <div className="absolute left-2 top-2">
                                    <div
                                        className="flex justify-center items-center font-semibold"
                                        onClick={closeModal}
                                    >
                                        <button className="leading-none rounded-full transition inline-flex justify-center items-center font-bold text-lg h-8 w-8 hover:bg-red-300 hover:bg-opacity-50 hover:text-red-600">
                                            &times;
                                        </button>
                                    </div>
                                </div>
                                <div className="flex h-full justify-center items-center">
                                    <Image
                                        alt="Celehub logo"
                                        src="/images/cs-logo.png"
                                        width={30}
                                        height={50}
                                    />
                                </div>
                            </div>
                        )}
                        <div
                            data-header
                            className={`px-4 relative ${
                                !showLogo ? "mt-1" : ""
                            }`}
                        >
                            <div
                                className="border-b border-1 cs-border bg-transparent
                                px-1 backdrop-blur-[4px] sticky top-0 left-0 w-full z-10"
                            >
                                {headerContent ? (
                                    <div className="flex h-[70px] w-full items-center">
                                        <div
                                            className={`flex-1 ${
                                                !showLogo
                                                    ? "flex gap-4 items-center"
                                                    : ""
                                            }`}
                                        >
                                            {!showLogo && (
                                                <div
                                                    className="flex justify-center items-center font-semibold"
                                                    onClick={closeModal}
                                                >
                                                    <button className="leading-none transition inline-flex justify-center items-center rounded-full font-bold text-lg h-8 w-8 hover:bg-red-300 hover:bg-opacity-50 hover:text-red-600">
                                                        &times;
                                                    </button>
                                                </div>
                                            )}
                                            <div className="cursor-pointer w-max">
                                                <div
                                                    className={`${
                                                        showLogo
                                                            ? "pr-3"
                                                            : "px-3"
                                                    }`}
                                                >
                                                    <span className="inline-block text-xl font-semibold tracking-wider">
                                                        {title}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center h-full">
                                            <div className="">
                                                <Button
                                                    disabled={false}
                                                    className={"rounded-lg"}
                                                    text={actionBtnText}
                                                    onClick={onActionClicked}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-[50px] w-full">
                                        {jsxHeaderContent}
                                    </div>
                                )}
                            </div>

                            <div className="max-h-[calc(100vh-75px-50px)] overflow-hidden overflow-y-hidden">
                                {content || jsxContent}
                            </div>
                        </div>
                        {jsxFooterContent && (
                            <div
                                className={
                                    "mr-4 px-4 pos-absolute top-[100%] left-0 "
                                }
                            >
                                {/* <div className="cs-divider h-[1px] m-0 p-0"></div> */}
                                <div className={`pt-2`}>{jsxFooterContent}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.defaultProps = {
    title: "Modal Title",
    content: null,
    headerContent: true,
    jsxHeaderContent: <></>,
    footerContent: false,
    jsxFooterContent: null,
    jsxContent: <></>,
    btnContent: "Button",
    jsxBtnContent: "",
    showLogo: false,
    onActionClicked: () => {},
    onClose: () => {},
}
