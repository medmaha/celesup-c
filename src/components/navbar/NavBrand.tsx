import Image from "next/image"
import Link from "next/link"
import React, { useContext, useEffect } from "react"
import { GlobalContext } from "../../layouts/context"
import { updateActiveLink } from "../../redux/app"

export default function NavBrand() {
    const { storeDispatch } = useContext(GlobalContext)
    useEffect(() => {
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
    }, [])
    return (
        <h1 className="min-w-max flex h-full items-center">
            <Link href="/" className="inline-flex gap-1 items-center">
                <div className="h-[30px] w-[30px] inline-block">
                    <Image
                        src={"/images/cs-logo.png"}
                        alt="Celehub logo"
                        width={30}
                        height={30}
                        className=""
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <p className="hidden lg:inline-block text-lg font-semibold tracking-wider xl:text-xl">
                    Celehub
                </p>
            </Link>
        </h1>
    )
}
