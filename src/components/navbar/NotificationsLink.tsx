import React, { SetStateAction, useEffect, useState } from "react"
import Dropdown from "../UI/Dropdown"
import Icon from "../UI/Icon"
import Image from "next/image"
import { celesupBackendApi } from "../../axiosInstance"
import Loading from "../UI/Loading"
import { AuthUser } from "../../types/user"
import { useDispatch } from "react-redux"
import { updateActiveLink } from "../../redux/app"

type Notification = {
    sender?: AuthUser
    recipient: AuthUser
    action: string
    hint: string
    hint_img: string
    created_at: string
    id: string
}
type Notifications = {
    new: Notification[]
    old: Notification[]
}

export default function NotificationsLink({ link, handleLinkClicked }: any) {
    const [notifications, setNotifications] = useState<null | Notifications>(
        null,
    )

    useEffect(() => {
        console.log(notifications)
    }, [notifications])

    const [newAlerts, setNewAlerts] = useState<boolean>(false)

    return (
        <Dropdown
            title={newAlerts ? "You've new notifications" : "Notifications"}
            btnParentClass="inline-flex h-[75%] items-center relative"
            button={
                <>
                    {newAlerts && (
                        <span className="absolute right-[40%] top-[3px] w-[10px] h-[10px] rounded-full inline-block bg-red-500"></span>
                    )}
                    <span
                        onClick={handleLinkClicked}
                        className="flex h-[75%] items-center justify-center"
                    >
                        <Icon
                            name={link.icon}
                            className="w-[1.2em] h-[1.2em] cursor-pointer"
                        />
                    </span>
                </>
            }
            identifier="alerts"
            options={{ right: "50%" }}
            jsxContent={
                <Content data={notifications} setData={setNotifications} />
            }
        />
    )
}

type Props = {
    data: Notifications | null
    setData: (
        callback: (data: Notifications | null) => Notifications | null,
    ) => void
}

function Content({ data, setData }: Props) {
    const [notifications, setNotifications] = useState<Notifications | null>(
        null,
    )
    const [pending, togglePending] = useState(false)

    const storeDispatch = useDispatch()

    useEffect(() => {
        if (data === null) getNotifications()

        return () => {
            let pathName = window.location.pathname
            let paths = pathName.match(/\//g)

            if (paths?.length! > 1) {
                pathName = ""
            } else {
                pathName = pathName.replace(/\//, "") || "home"
            }
            storeDispatch(
                updateActiveLink({
                    data: pathName,
                }),
            )
        }
    }, [])

    useEffect(() => {
        if (data !== null) setNotifications(data)
    }, [data])

    async function getNotifications() {
        togglePending(true)
        try {
            const { data } = await celesupBackendApi.get("/notifications")
            setData(data)
            seenNotifications(data)
        } catch (error: any) {
            console.error(error.message)
        }
        togglePending(false)
    }

    let timeout: any
    async function seenNotifications(data: Notifications) {
        const notifications = data.new.map((alert) => alert.id)

        if (timeout) clearTimeout(timeout)

        setTimeout(async () => {
            try {
                await celesupBackendApi.put("/notifications/viewed", {
                    notifications,
                })
            } catch (error: any) {
                console.log(error.message)
            }
        }, 2500)
    }

    return (
        <div className="w-full secondary-bg z-[100] primary-text max-w-[300px] sm:min-w-[250px] md:min-w-[300px]">
            <h4 className="text-semibold w-full items-center font-medium tracking-wide pt-1 px-2 inline-flex justify-between gap-4">
                <span className="inline-block">Notifications</span>
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z" />
                    </svg>
                </button>
            </h4>
            <span className="cs-divider"></span>
            <div className="block w-full h-full min-h-max relative max-h-[400px] overflow-hidden overflow-y-auto">
                {pending && <Loading loader="spinner" text={null} />}
                {notifications &&
                    !(
                        !!notifications.new?.length ||
                        !!notifications.old?.length
                    ) && (
                        <p className="text-center text-base min-h-[100px] py-4 px-1 font-semibold tracking-wider h-full flex justify-center items-center">
                            You haven&apos;t got notifications yet!
                        </p>
                    )}
                {!!notifications?.new?.length && (
                    <div className="pb-2 w-full flex flex-col gap-2">
                        <h4 className="text-sm secondary-text font-semibold px-2 text-center">
                            New
                        </h4>
                        <span className="cs-divider"></span>
                        {notifications.new?.map((notification, idx: number) => {
                            return (
                                <span key={notification.id}>
                                    <div className="inline-flex items-center justify-between px-2 gap-4 w-full">
                                        {notification.sender && (
                                            <div className="sender inline-block w-max">
                                                <div className="w-[35px] rounded-full cs-border border-[1px]">
                                                    <Image
                                                        alt="notification sender avatar"
                                                        src={
                                                            notification.sender
                                                                .avatar
                                                        }
                                                        width={35}
                                                        height={35}
                                                        className="rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-1 inline-flex gap-1 items-center w-full justify-between">
                                            <div className="hint inline-flex flex-col w-full">
                                                <p>{notification.action}</p>
                                                {notification.hint && (
                                                    <p
                                                        className="line-clamp-3 secondary-text"
                                                        style={{
                                                            overflow: "hidden",
                                                            display:
                                                                " -webkit-box",
                                                            WebkitBoxOrient:
                                                                "vertical",
                                                            WebkitLineClamp:
                                                                "3",
                                                        }}
                                                    >
                                                        {'" '}
                                                        {notification.hint}
                                                        {' "'}
                                                    </p>
                                                )}
                                            </div>
                                            {notification.hint_img && (
                                                <div className="hint-img w-max">
                                                    <div className="rounded-md w-[70px]">
                                                        <Image
                                                            alt="notification hint photo"
                                                            src={
                                                                notification.hint_img
                                                            }
                                                            width={70}
                                                            height={70}
                                                            className="rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {idx !== notifications?.new?.length && (
                                        <span className="cs-divider "></span>
                                    )}
                                </span>
                            )
                        })}
                    </div>
                )}
                {!!notifications?.old?.length && (
                    <div className="pb-2 w-full flex flex-col gap-2">
                        <h4 className="text-sm secondary-text font-semibold px-2 text-center">
                            Old Notifications
                        </h4>
                        <span className="cs-divider"></span>
                        {notifications.old.map((notification, idx: number) => {
                            return (
                                <span key={notification.id}>
                                    <div className="inline-flex items-center justify-between px-2 gap-4 w-full">
                                        {notification.sender && (
                                            <div className="sender inline-block w-max">
                                                <div className="w-[35px] rounded-full cs-border border-[1px]">
                                                    <Image
                                                        alt="notification sender avatar"
                                                        src={
                                                            notification.sender
                                                                .avatar
                                                        }
                                                        width={35}
                                                        height={35}
                                                        className="rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-1 inline-flex gap-1 items-center w-full justify-between">
                                            <div className="hint inline-flex flex-col w-full">
                                                <p>{notification.action}</p>
                                                {notification.hint && (
                                                    <p
                                                        className="line-clamp-3 secondary-text"
                                                        style={{
                                                            overflow: "hidden",
                                                            display:
                                                                " -webkit-box",
                                                            WebkitBoxOrient:
                                                                "vertical",
                                                            WebkitLineClamp:
                                                                "3",
                                                        }}
                                                    >
                                                        {notification.hint}
                                                    </p>
                                                )}
                                            </div>
                                            {notification.hint_img && (
                                                <div className="hint-img w-max">
                                                    <div className="rounded-md w-[70px]">
                                                        <Image
                                                            alt="notification hint photo"
                                                            src={
                                                                notification.hint_img
                                                            }
                                                            width={70}
                                                            height={70}
                                                            className="rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {idx !== notifications?.old?.length && (
                                        <span className="cs-divider "></span>
                                    )}
                                </span>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
