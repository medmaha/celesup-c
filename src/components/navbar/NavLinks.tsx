import Icon from "../UI/Icon"
import Link from "next/link"
import NotificationsLink from "./NotificationsLink"
import CSTypography from "../../library/typography"
import { useContext, useLayoutEffect } from "react"
import { GlobalContext } from "../../layouts/context"
import { updateActiveLink } from "../../redux/app"

type Props = {
    createLinkHandler: () => void
}

export default function NavLinks({ createLinkHandler }: Props) {
    const { activeLink, storeDispatch } = useContext(GlobalContext)

    function handleLinkClicked(ev: any) {
        const link =
            ev.target.closest("[data-link]") ||
            (ev.currentTarget.hasAttribute("data-link") && ev.target)

        if (!link) return

        switch (link.dataset.link) {
            case "create":
                createLinkHandler()
                break

            default:
                break
        }

        // console.log(link)
    }

    return (
        <div className="nav-links hidden w-full max-w-[400px] h-full md:inline-block gap-[1rem] flex-1">
            <ul className="flex items-center h-full gap-1 justify-evenly w-full">
                {links.map((link, idx) => {
                    return (
                        <li
                            data-link={link.name.toLowerCase()}
                            key={idx}
                            onClick={() => {
                                storeDispatch(
                                    updateActiveLink({
                                        data: link.name.toLowerCase(),
                                    }),
                                )
                            }}
                            className={`flex items-center justify-center h-[75%] w-full ${
                                activeLink === link.name.toLowerCase() &&
                                link.path
                                    ? "active"
                                    : ""
                            }`}
                        >
                            {link.icon === "notification" ? (
                                <NotificationsLink
                                    link={link}
                                    handleLinkClick={handleLinkClicked}
                                />
                            ) : (
                                <>
                                    {link.path ? (
                                        <Link
                                            href={link.path}
                                            onClick={handleLinkClicked}
                                            title={link.name}
                                            className="flex h-[75%]  items-center justify-between"
                                        >
                                            <Icon
                                                name={link.icon}
                                                className="w-[1.2em] h-[1.2em] cursor-pointer"
                                            />
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={handleLinkClicked}
                                            title={link.name}
                                            className="flex h-[75%]  items-center justify-between"
                                        >
                                            <Icon
                                                name={link.icon}
                                                className="w-[1.2em] h-[1.2em] cursor-pointer"
                                            />
                                        </button>
                                    )}
                                </>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const links = [
    { icon: "house", name: "Home", path: "/" },
    { icon: "create", name: "Create", path: null },
    { icon: "hashtag", name: "Discover", path: "/discover" },
    { icon: "video", name: "Videos", path: "/videos" },
    { icon: "notification", name: "Notifications", path: null },
    { icon: "message", name: "Messages", path: "/messages" },
]
