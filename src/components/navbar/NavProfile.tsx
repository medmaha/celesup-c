import React, { useContext, useState } from "react"
import Dropdown from "../UI/Dropdown"
import Image from "next/image"
import { useDispatch } from "react-redux"

import { updateAuthUser, updateMoods } from "../../redux/app"
import { GlobalContext } from "../../layouts/context"
import { GlobalContext as GlobalAppContext } from "../../types/global"
import { useRouter } from "next/router"
import Link from "next/link"

export default function NavProfile() {
    const globalContext = useContext(GlobalContext)
    const [onlineStatus, setOnlineStatus] = useState(true)
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
            btnParentClass="inline-flex justify-center items-center"
            button={
                <span className="inline-block rounded-full outline-2 cs-outline w-[40px] h-[40px]">
                    {globalContext.user?.avatar && (
                        <Image
                            onClick={() => {
                                storeDispatch(
                                    updateMoods({
                                        dispatch: true,
                                        data: {
                                            loaded: true,
                                        },
                                    }),
                                )
                            }}
                            width={40}
                            height={40}
                            style={{ objectFit: "cover" }}
                            src={globalContext.user.avatar}
                            alt={globalContext.user.username || "celesup"}
                            className="rounded-full"
                            defaultValue={"images/default-avatar.png"}
                        />
                    )}
                </span>
            }
            jsxContent={
                <>
                    <div className="w-full ">
                        <Link
                            href={`/${globalContext.user.username}`}
                            className="typography inline-block w-full text-center p-2 pb-1"
                        >
                            <button>
                                Signed in as{" "}
                                <b>{globalContext.user.username}</b>
                            </button>
                        </Link>
                        <span className="cs-divider"></span>
                        <div className="flex flex-col gap-2 w-full">
                            <button
                                onClick={() => {
                                    setOnlineStatus((prev) => !prev)
                                }}
                                className="hover:text-sky-400 py-1 px-2 rounded-lg inline-flex items-center w-full justify-between bg-sky-500 bg-opacity-0 hover:bg-opacity-10 transition"
                            >
                                <span>Status</span>
                                <span
                                    title={onlineStatus ? "Online" : "Offline"}
                                >
                                    {onlineStatus ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                        >
                                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 18 18"
                                        >
                                            <path
                                                d="M12 5h4V1zm0 11V5L1 16z"
                                                fillOpacity=".3"
                                            />
                                            <path d="M14 16h2v-2h-2v2zm0-9v5h2V7h-2z" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                            <Link
                                href={"/" + globalContext.user.username}
                                className="hover:text-sky-400 py-1 px-2 rounded-lg inline-flex items-center w-full justify-between bg-sky-500 bg-opacity-0 hover:bg-opacity-10 transition"
                            >
                                <span>Profile</span>
                                <span>
                                    <svg
                                        height={18}
                                        width={18}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
                                    </svg>
                                </span>
                            </Link>
                            <Link
                                href={"/settings"}
                                className="hover:text-sky-400 py-1 px-2 rounded-lg inline-flex items-center w-full justify-between bg-sky-500 bg-opacity-0 hover:bg-opacity-10 transition"
                            >
                                <span>Settings</span>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        data-name="Layer 1"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z" />
                                    </svg>
                                </span>
                            </Link>
                            <button
                                onClick={logoutUser}
                                className="hover:text-sky-400 py-1 px-2 rounded-lg inline-flex items-center w-full justify-between bg-sky-500 bg-opacity-0 hover:bg-opacity-10 transition"
                            >
                                <span>logout</span>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z" />
                                    </svg>
                                </span>
                            </button>
                            <button
                                onClick={() => {}}
                                className="hover:text-sky-400 py-1 px-2 rounded-lg inline-flex items-center w-full justify-between bg-sky-500 bg-opacity-0 hover:bg-opacity-10 transition"
                            >
                                <span>Help</span>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M11.29,15.29a1.58,1.58,0,0,0-.12.15.76.76,0,0,0-.09.18.64.64,0,0,0-.06.18,1.36,1.36,0,0,0,0,.2.84.84,0,0,0,.08.38.9.9,0,0,0,.54.54.94.94,0,0,0,.76,0,.9.9,0,0,0,.54-.54A1,1,0,0,0,13,16a1,1,0,0,0-.29-.71A1,1,0,0,0,11.29,15.29ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,7A3,3,0,0,0,9.4,8.5a1,1,0,1,0,1.73,1A1,1,0,0,1,12,9a1,1,0,0,1,0,2,1,1,0,0,0-1,1v1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,12,7Z" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <span className="cs-divider"></span>
                        <p className="tertiary-text text-center text-sm pb-4">
                            © 2023 Celesup, Inc.
                        </p>
                    </div>
                </>
            }
            identifier="navbarDropdown"
            options={{
                right: "0",
            }}
        />
    )
}
