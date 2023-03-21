import React from "react"
import Image from "next/image"
import Button from "../../../components/UI/Button"

export default function Follow() {
    return (
        <div
            className="p-1 w-full flex flex-col gap-[1rem] cs-card mt-3 p-2 px-3 rounded-lg cursor-pointer"
            id="FollowSuggestionWrapper"
        >
            <div className="">
                <h2 className="font-bold text-xl">Who to follow</h2>
            </div>
            {[1, 2, 3].map((user_id) => {
                return (
                    <div
                        className="flex gap-1 justify-between items-center"
                        key={user_id}
                    >
                        <User />
                    </div>
                )
            })}
        </div>
    )
}

function User({ user }) {
    return (
        <>
            <div className="flex gap-2">
                <div className="min-w-max rounded-full outline-2 cs-outline">
                    <Image
                        className="rounded-full"
                        src={"/images/avatar.png"}
                        width={45}
                        height={45}
                        alt="user medmaha"
                    />
                </div>
                <div className="flex flex-col justify-center cursor-pointer">
                    <span className="font-semibold tracking-wide leading-none">
                        Mahamed Toure
                    </span>
                    <span className="leading-none tertiary-text">@medmaha</span>
                </div>
            </div>
            <div className="">
                <Button text={"follow"} className="rounded-full" />
            </div>
        </>
    )
}
