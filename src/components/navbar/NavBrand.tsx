import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function NavBrand() {
    return (
        <h1 className="inline-block min-w-max">
            <Link
                href="/"
                className="w-[30px] lg:w-auto h-[30px] inline-flex gap-1 items-center"
            >
                <Image
                    src={"/images/cs-logo.png"}
                    alt="Celehub logo"
                    width={30}
                    height={30}
                    className=""
                    style={{ objectFit: "cover" }}
                />
                <p className="hidden lg:inline-block  text-lg font-semibold tracking-wider xl:text-xl">
                    Celehub
                </p>
            </Link>
        </h1>
    )
}
