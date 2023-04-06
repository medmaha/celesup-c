import { capitalize } from "../../library/texts"
import Dropdown from "../UI/Dropdown"
import Icon from "../UI/Icon"
import Link from "next/link"
import NotificationsLink from "./NotificationsLink"

type Props = {
    createLinkHandler: () => void
}

export default function NavigationLinks({ createLinkHandler }: Props) {
    //
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
        <div className="nav-links hidden w-full h-full md:inline-block gap-[1rem]">
            <ul className="flex items-center h-full gap-1 justify-evenly w-full">
                {links.map((link, idx) => {
                    return (
                        <li
                            data-link={link.icon}
                            key={idx}
                            className={`flex items-center justify-center h-[75%] w-full ${
                                idx === 0 ? "active" : ""
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
                                            title={capitalize(link.icon)}
                                            className="flex h-[75%] w-[75%] items-center"
                                        >
                                            <Icon
                                                name={link.icon}
                                                className="w-[1.2em] h-[1.2em] cursor-pointer"
                                            />
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={handleLinkClicked}
                                            title={capitalize(link.icon)}
                                            className="flex h-[75%] w-[75%] items-center"
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
    { icon: "house", path: "/" },
    { icon: "create", path: null },
    { icon: "hashtag", path: "/discover" },
    { icon: "video", path: "/videos" },
    { icon: "notification", path: null },
    { icon: "message", path: "/messages" },
]
