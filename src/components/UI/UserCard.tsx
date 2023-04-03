import Image from "next/image"
import React, { useCallback, useEffect, useRef, useState } from "react"
import Button from "./Button"

let hoveringTimeout: any

import { Author } from "../../apps/globalInterface"
import Link from "next/link"

type UserCard = {
    link?: boolean
    btnElement: React.ReactNode
    author: Author
}

export default function UserCard({ link, btnElement, author }: UserCard) {
    const buttonRef = useRef(document.createElement("div"))
    const [displayModal, setDisplayModal] = useState(false)

    // const cardPosition = cardRef.current.getBoundingClientRect()

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.addEventListener("mouseenter", handleMouseEnter)
            buttonRef.current.addEventListener("mouseleave", handleMouseLeave)
            // document.addEventListener('')

            return () => {
                document.removeEventListener("mouseenter", handleMouseEnter)
                document.removeEventListener("mouseleave", handleMouseLeave)
            }
        }
    }, [])

    function handleMouseEnter() {
        clearTimeout(hoveringTimeout)

        hoveringTimeout = setTimeout(() => {
            setDisplayModal(true)
        }, 1500)
    }
    function handleMouseLeave() {
        clearTimeout(hoveringTimeout)
        hoveringTimeout = null
        setDisplayModal(false)
    }

    return (
        <div ref={buttonRef} className={`inline-flex relative`}>
            {displayModal && <Card author={author} />}
            <Link
                href={"/" + author.username}
                className={`cursor-pointer transition ${
                    link ? "text-primary" : ""
                }`}
            >
                {btnElement}
            </Link>
        </div>
    )
}

function Card({ author }: any) {
    const cardRef = useRef(author.id)
    const [user, setUser] = useState(author)
    const [cardStyles, setPosition] = useState({
        left: "0",
        top: 0,
    })

    const updatePosition = useCallback((pos: any, del: any) => {
        setPosition((prev) => {
            let data = {
                ...prev,
                ...pos,
            }
            delete data[del]
            return data
        })
    }, [])

    useEffect(() => {
        if (!cardRef.current) return
        const cardPosition = cardRef.current.getBoundingClientRect()

        if (cardPosition.y >= 250) {
            const _pos = { bottom: "105%" }
            updatePosition(_pos, "top")
        } else {
            const _pos = { top: "105%" }
            updatePosition(_pos, "bottom")
        }
    }, [cardRef, updatePosition])

    return (
        <div
            ref={cardRef}
            style={cardStyles}
            className={`absolute z-10 min-h-[50px] min-w-[250px] cs-user-card`}
        >
            <div className="w-full h-full secondary-bg p-3 rounded-md cs-outline outline-1">
                <div className="flex justify-between items-center">
                    <div className="min-w-max">
                        <Link
                            href={"/" + author.username}
                            className="inline-block rounded-full outline-2 cs-outline w-[70px] h-[70px]"
                        >
                            <Image
                                className="rounded-full w-full h-full"
                                width={70}
                                height={70}
                                style={{ objectFit: "cover" }}
                                src={user.avatar}
                                alt="user avatar"
                            />
                        </Link>
                    </div>
                    <div className="">
                        <Button text={`+ Follow`} className="rounded-[1rem]" />
                    </div>
                </div>
                <div className="flex justify-between items-center my-2">
                    <Link
                        href={"/" + author.username}
                        className="m-0 p-0 leading-[1rem] flex flex-col"
                    >
                        <h2 className="primary-text bold-bold tracking-wider">
                            {/* // todo */}
                            {author.name}
                        </h2>
                        <p className="truncate tracking-wide text-primary-light leading-[1rem]">
                            @{user.username.toLowerCase()}
                        </p>
                    </Link>
                </div>
                <div className="">
                    {/* // todo */}
                    <span className="text-sm secondary-text font-semibold leading-[1rem] tracking-wide cs-text-truncate">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iste deserunt dolorem, architecto consequatur autem non!
                    </span>
                </div>
                <div className="footer w-full mt-2">
                    <div className="tertiary-bg primary-text w-full flex gap-4 px-2 py-1 justify-around text-sm">
                        <div className="inline-flex gap-1 cursor-default">
                            <span className="font-semibold">247</span>
                            <span className="secondary-text">friends</span>
                        </div>
                        <span className="inline-flex gap-1 cursor-default">
                            <span className="font-semibold">378</span>
                            <span className="secondary-text">following</span>
                        </span>
                        <span className="inline-flex gap-1 cursor-default">
                            <span className="font-semibold">758</span>
                            <span className="secondary-text">followers</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
