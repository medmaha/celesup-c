import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import CSTypography from "../../library/typography"
import Icon from "../UI/Icon"
import Link from "next/link"
import { updateAuthUser, updateMoods } from "../../redux/app"
import { GlobalContext } from "../../layouts/context"
import { useRouter } from "next/router"

type Props = {
    navDrawer: boolean
    toggleNavDrawer: (callback: (state: boolean) => boolean) => void
}

export default function NavDrawer({ navDrawer, toggleNavDrawer }: Props) {
    const [open, toggleOpen] = useState(false)

    useLayoutEffect(() => {
        if (navDrawer) toggleOpen(true)
        else toggleOpen(false)
    }, [navDrawer])

    return (
        <div
            style={{
                backgroundColor: "transparent",
                backdropFilter: "blur(5px)",
                transitionDuration: "300ms",
            }}
            data-nav-drawer
            className={`absolute transition top-full -left-1 w-[calc(100%+0.5rem)] h-[calc(100vh-65px)] ${
                open
                    ? ` opacity-1 pointer-event-auto z-20`
                    : " opacity-0 pointer-events-none -z-10"
            }`}
        >
            {open && (
                <div className="tertiary-bg shadow-lg p-2 block w-full h-full max-w-[400px] md:hidden">
                    <Content open={open} toggleNavDrawer={toggleNavDrawer} />
                </div>
            )}
        </div>
    )
}

type ContentProps = {
    open: boolean
    toggleNavDrawer: (callback: (state: boolean) => boolean) => void
}
function Content({ toggleNavDrawer, open }: ContentProps) {
    const drawerRef = useRef<HTMLUListElement | null>(null)
    const { user, storeDispatch } = useContext(GlobalContext)
    const router = useRouter()

    const [activeLink, setActiveLink] = useState("")

    useEffect(() => {
        if (open || activeLink) {
            document.addEventListener("click", handleDomClick)
            return () => document.removeEventListener("click", handleDomClick)
        }
    }, [open])

    useLayoutEffect(() => {
        const pathName = window.location.pathname
        switch (true) {
            case pathName === "/":
                setActiveLink("Home")
                break
            case !!pathName.match(/\/discover/):
                setActiveLink("Explore")
                break
            case !!pathName.match(/\/videos/):
                setActiveLink("Videos")
                break
            case !!pathName.match(/\/notifications/):
                setActiveLink("Notification")
                break
            case !!pathName.match(/\/messages/):
                setActiveLink("Messages")
                break
            case !!pathName.match(/\/settings/):
                setActiveLink("Settings")
                break
            default:
                break
        }
    }, [])

    function handleLinkClicked(ev: any) {
        const link =
            ev.target.closest("[data-link]") ||
            (ev.currentTarget.hasAttribute("data-link") && ev.target)

        if (!link) return
        switch (link.dataset.link?.toLowerCase()) {
            case "create":
                storeDispatch(updateMoods({ create: "create" }))
                break
            default:
                break
        }
        toggleNavDrawer(() => false)
    }

    function handleDomClick(ev: any) {
        const target = ev.target

        if (
            target.closest("ul") !== drawerRef.current &&
            !target.dataset.drawerBtn &&
            !target.closest("[data-drawer-btn]")
        )
            toggleNavDrawer(() => false)
        // if (ev.target.hasAttribute("data-nav-drawer")) {
        //     toggleNavDrawer(() => false)
        // }
    }

    function logoutUser() {
        if (user) {
            localStorage.removeItem("a-usr")
            localStorage.removeItem("ata")
            localStorage.removeItem("atr")
            router.replace("/auth/login")
            toggleNavDrawer(() => false)
            storeDispatch(updateAuthUser({ dispatch: true }))
        }
    }

    return (
        <ul ref={drawerRef} className="flex flex-col h-full gap-4 w-full p-4">
            {links.map((link, idx) => {
                return (
                    <li
                        data-link={link.icon}
                        key={idx}
                        className={`inline-block w-full`}
                    >
                        {link.path ? (
                            <Link
                                data-link={link.name}
                                href={link.path}
                                onClick={handleLinkClicked}
                                title={link.name}
                                className={`
                                ${
                                    activeLink === link.name
                                        ? "bg-opacity-40"
                                        : "bg-opacity-0"
                                } w-full 
                                inline-flex gap-4 items-center hover:text-sky-400 py-1 px-2 rounded-lg
                                 bg-sky-500 bg-opacity-0 hover:bg-opacity-10 transition`}
                            >
                                <span className="inline-block w-[1.3em]">
                                    <Icon
                                        name={link.icon}
                                        className="w-[1.2em] h-[1.2em] cursor-pointer"
                                    />
                                </span>
                                <span className="text-lg font-semibold tracking-wide">
                                    {link.name}
                                </span>
                            </Link>
                        ) : (
                            <button
                                data-link={link.name}
                                onClick={handleLinkClicked}
                                title={link.name}
                                className="flex w-full gap-4 items-center hover:text-sky-400 py-1 px-2 rounded-lg bg-sky-500 bg-opacity-0 hover:bg-opacity-10 transition"
                            >
                                <span className="inline-block w-[1.3em]">
                                    <Icon
                                        name={link.icon}
                                        className="w-[1.2em] h-[1.2em] cursor-pointer"
                                    />
                                </span>
                                <span className="text-lg font-semibold tracking-wide">
                                    {link.name}
                                </span>
                            </button>
                        )}
                    </li>
                )
            })}
            <div className="flex flex-col gap-2 w-full">
                <div className="pb-1">
                    <Link
                        href={"/settings"}
                        className={`${
                            activeLink === "Settings"
                                ? "bg-opacity-40"
                                : "bg-opacity-0"
                        } w-full 
                        inline-flex gap-4 items-center hover:text-sky-400 py-1 px-2 rounded-lg
                        bg-sky-500 bg-opacity-0 hover:bg-opacity-10 transition`}
                    >
                        <span>
                            <svg
                                width={20}
                                height={20}
                                xmlns="http://www.w3.org/2000/svg"
                                data-name="Layer 1"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z" />
                            </svg>
                        </span>
                        <span className="text-lg font-semibold tracking-wide">
                            Settings
                        </span>
                    </Link>
                </div>
                <div className="pb-1">
                    <button
                        onClick={logoutUser}
                        className="flex w-full gap-4 items-center hover:text-sky-400 py-1 px-2 rounded-lg bg-sky-500 bg-opacity-0 hover:bg-opacity-10 transition"
                    >
                        <span>
                            <svg
                                width={20}
                                height={20}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z" />
                            </svg>
                        </span>
                        <span className="text-lg font-semibold tracking-wide">
                            logout
                        </span>
                    </button>
                </div>
                <div className="pb-1">
                    <button
                        onClick={() => {}}
                        className="flex w-full gap-4 items-center hover:text-sky-400 py-1 px-2 rounded-lg bg-sky-500 bg-opacity-0 hover:bg-opacity-10 transition"
                    >
                        <span>
                            <svg
                                width={20}
                                height={20}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M11.29,15.29a1.58,1.58,0,0,0-.12.15.76.76,0,0,0-.09.18.64.64,0,0,0-.06.18,1.36,1.36,0,0,0,0,.2.84.84,0,0,0,.08.38.9.9,0,0,0,.54.54.94.94,0,0,0,.76,0,.9.9,0,0,0,.54-.54A1,1,0,0,0,13,16a1,1,0,0,0-.29-.71A1,1,0,0,0,11.29,15.29ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,7A3,3,0,0,0,9.4,8.5a1,1,0,1,0,1.73,1A1,1,0,0,1,12,9a1,1,0,0,1,0,2,1,1,0,0,0-1,1v1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,12,7Z" />
                            </svg>
                        </span>
                        <span className="text-lg font-semibold tracking-wide">
                            Help
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex-1 flex-col flex justify-end">
                {/* <span className="cs-divider"></span> */}
                <span className="cs-divider secondary-bg"></span>
                <p className="text-center secondary-text pt-2">
                    Copyright © 2023 Celehub Inc. All rights reserved.
                </p>
            </div>
        </ul>
    )
}

const links = [
    { icon: "house", name: "Home", path: "/" },
    { icon: "create", name: "Create", path: null },
    { icon: "hashtag", name: "Explore", path: "/discover" },
    { icon: "video", name: "Videos", path: "/videos" },
    { icon: "notification", name: "Notification", path: "/notifications" },
]
