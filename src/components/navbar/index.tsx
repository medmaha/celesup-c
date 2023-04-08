import React, { useContext, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import Button from "../UI/Button"

import { GlobalContext } from "../../layouts/context"
import { updateMoods } from "../../redux/app"
import CSCookies from "../../library/cookies"

import SearchBar from "./NavSearchBar"
import NavLinks from "./NavLinks"
import NavProfile from "./NavProfile"
import NavMenu from "./NavMenu"
import NavDrawer from "./NavDrawer"
import NavBrand from "./NavBrand"

function Navbar() {
    const authCookie = () => {
        const c1 = CSCookies.get("cs-auth-val")
        const l1 = localStorage.getItem("cs-auth-val")
        return c1 || l1
    }

    const globalContext = useContext(GlobalContext)

    const [validatingUser, setValidatingUser] = useState(authCookie())
    const [navDrawer, toggleNavDrawer] = useState(false)

    useEffect(() => {
        setValidatingUser(authCookie())
    }, [globalContext.user])

    function createLinkHandler() {
        globalContext.storeDispatch(updateMoods({ create: "create" }))
    }

    return (
        <nav className="bg-[var(--bg-primary)] bg-opacity-30 backdrop-blur-[5px] z-[100] h-[65px] sticky top-0 w-full px-1 shadow-md shadow-grey-500/50 dark:shadow-slate-800/50">
            {globalContext.moods.loaded && (
                <div className="flex gap-[1rem] justify-between px-1 items-center mx-auto h-full lg:w-[90%] relative">
                    {/* brand and searchBar*/}

                    <NavBrand />

                    {globalContext.user && !validatingUser && (
                        <>
                            <SearchBar />
                            <NavLinks createLinkHandler={createLinkHandler} />

                            <div className="inline-flex justify-center items-center gap-2 sm:gap-4">
                                <NavProfile />
                                <NavMenu
                                    navDrawer={navDrawer}
                                    toggleNavDrawer={toggleNavDrawer}
                                />
                            </div>

                            <NavDrawer
                                navDrawer={navDrawer}
                                toggleNavDrawer={toggleNavDrawer}
                            />
                        </>
                    )}

                    {validatingUser && globalContext.user && (
                        <div className="flex flex-1 gap-4 items-center justify-end min-w-max">
                            <h3 className="secondary-text tracking-wide font-semibold">
                                @{globalContext.user.username.toLowerCase()}
                            </h3>
                            <div className="inline-flex">
                                <NavProfile />
                            </div>
                        </div>
                    )}

                    {!globalContext.user && !validatingUser && (
                        <div className="flex flex-1 gap-1 items-center justify-end min-w-max">
                            <Link
                                href="/auth/login"
                                className="font-semibold p-1 px-2 mr-1 hover:text-blue-400"
                            >
                                <span className="hover:text-primary tracking-wide">
                                    Log In
                                </span>
                            </Link>
                            <Link href="/auth/register" className="p-1">
                                <Button
                                    className={
                                        "bg-secondary text-white rounded-md py-2 px-3 font-semibold tracking-wide"
                                    }
                                    text={"Sign up"}
                                />
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar
