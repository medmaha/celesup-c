import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function NavBrand() {
    return (
        <h1 className="inline-block min-w-max">
            <Link href="/" className="h-[30px] inline-flex gap-1 items-center">
                <div className="h-[30px] w-[30px] inline-block-">
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
