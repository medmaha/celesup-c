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
import { updateMoods } from "../../redux/app"
import { GlobalContext } from "../../layouts/context"

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
    const { storeDispatch } = useContext(GlobalContext)

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
            case !!pathName.match(/\/messages/):
                setActiveLink("Messages")
                break
            default:
                break
        }
    }, [])

    return (
        <ul ref={drawerRef} className="flex flex-col h-full gap-4 w-full p-4">
            {links.map((link, idx) => {
                return (
                    <li
                        data-link={link.icon}
                        key={idx}
                        className={`inline-block w-full ${
                            idx === 0 ? "active" : ""
                        }`}
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
            <div className="flex-1 flex-col flex justify-end">
                {/* <span className="cs-divider"></span> */}
                <span className="cs-divider secondary-bg"></span>
                <p className="text-center secondary-text pt-2">
                    Copyright © 2023 Celesup Inc. All rights reserved.
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
    { icon: "notification", name: "Notifications", path: "/notifications" },
    { icon: "message", name: "Messages", path: "/messages" },
]
