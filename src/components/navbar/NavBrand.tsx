import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function NavBrand() {
    return (
        <h1 className="inline-block min-w-max">
            <Link href="/" className="w-[30px] h-[30px]">
                <Image
                    src={"/images/cs-logo.png"}
                    alt="celesup logo"
                    width={30}
                    height={30}
                    className=""
                    style={{ objectFit: "cover" }}
                />
            </Link>
        </h1>
    )
}
