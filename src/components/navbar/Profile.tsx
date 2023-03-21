import React, { useContext, useState } from "react"
import Dropdown from "../UI/Dropdown"
import Image from "next/image"
import { useDispatch } from "react-redux"

import { updateAuthUser, updateMoods } from "../../redux/app"
import { GlobalContext } from "../../layouts/context"
import { GlobalContext as GlobalAppContext } from "../../types/global"
import { useRouter } from "next/router"

export default function Profile() {
    const globalContext = useContext(GlobalContext)
    const [onlineStatus, setOnlineStatus] = useState(false)
    const router = useRouter()
    const storeDispatch = useDispatch()

    function logoutUser() {
        if (globalContext.user) {
            localStorage.removeItem("a-usr")
            localStorage.removeItem("ata")
            localStorage.removeItem("atr")
            router.replace("/auth/login")
            globalContext.storeDispatch(updateAuthUser({ dispatch: true }))
        }
    }

    return (
        <Dropdown
            btnParentClass="inline-block w-full h-full"
            button={
                <div className="rounded-full outline-2 cs-outline w-[50px] h-[50px]">
                    {globalContext.user?.avatar && (
                        <Image
                            onClick={() => {
                                storeDispatch(
                                    updateMoods({
                                        dispatch: true,
                                    }),
                                )
                            }}
                            width={50}
                            height={50}
                            style={{ objectFit: "cover" }}
                            src={globalContext.user.avatar}
                            alt={globalContext.user.username}
                            className="rounded-full"
                        />
                    )}
                </div>
            }
            items={dropdownItems(globalContext, onlineStatus, logoutUser)}
            identifier="navbarDropdown"
            options={{
                right: "0",
            }}
        />
    )
}

type Items = {
    text: JSX.Element | string
    icon: JSX.Element | string
    onClicked?: () => void
}

const dropdownItems = (
    globalContext: GlobalAppContext,
    onlineStatus: boolean,
    logoutUser: any,
): Items[] => {
    return [
        // { text: 'Profile', icon:<h1>Hello</>},
        {
            text: (
                <div className="d-flex justify-content-between min-w-max align-items-center">
                    <div className="w-[50px] h-[50px] rounded-full outline-2">
                        {globalContext.user && (
                            <Image
                                crossOrigin="anonymous"
                                src={globalContext.user.avatar}
                                alt={globalContext.user.username}
                                className="rounded-full cs-outline outline-2"
                                style={{ objectFit: "cover" }}
                                width={50}
                                height={50}
                            />
                        )}
                    </div>
                </div>
            ),
            icon: (
                <div className="typography">
                    <span className="d-block center font-sm">
                        {globalContext.user.name || globalContext.user.username}
                    </span>
                    <h3>
                        <strong>{globalContext.user.name}</strong>
                    </h3>
                </div>
            ),
            // onClicked: userAccount,
        },
        {
            text: "Status",
            icon: `${onlineStatus ? "Online" : "Offline"}`,
            onClicked: () => {
                // setOnlineStatus((prev) => !prev)
            },
        },
        {
            text: "Profile",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
                </svg>
            ),
            // onClicked: userAccount,
        },
        {
            text: "Settings",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                >
                    <path d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z" />
                </svg>
            ),
            onClicked: () => {
                // navigate("/settings")
            },
        },
        {
            text: "Logout",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z" />
                </svg>
            ),
            onClicked: logoutUser,
        },
        {
            text: "Help",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M11.29,15.29a1.58,1.58,0,0,0-.12.15.76.76,0,0,0-.09.18.64.64,0,0,0-.06.18,1.36,1.36,0,0,0,0,.2.84.84,0,0,0,.08.38.9.9,0,0,0,.54.54.94.94,0,0,0,.76,0,.9.9,0,0,0,.54-.54A1,1,0,0,0,13,16a1,1,0,0,0-.29-.71A1,1,0,0,0,11.29,15.29ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,7A3,3,0,0,0,9.4,8.5a1,1,0,1,0,1.73,1A1,1,0,0,1,12,9a1,1,0,0,1,0,2,1,1,0,0,0-1,1v1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,12,7Z" />
                </svg>
            ),
            // onClicked: togglePostDropdownMenu,
        },
    ]
}
