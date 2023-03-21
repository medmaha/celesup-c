import { useContext } from "react"
import { GlobalContext } from "../../layouts/context"
import { capitalize } from "../../library/texts"
import { updateMoods } from "../../redux/app"
import Icon from "./Icon"
import Image from "./Image"

export default function Compose() {
    const globalContext = useContext(GlobalContext)
    return (
        <div
            id="composeCreate"
            className="sm:p-[1rem] flex-col flex justify-center min-h-[70px] w-full max-w-[560px] rounded-sm
            "
        >
            <div className="flex justify-around gap-4 sm:gap-2 items-center w-full">
                <Image
                    src="/images/avatar.png"
                    width={50}
                    height={50}
                    alt="compose"
                    className="rounded-full outline-1 cs-outline"
                />
                <div className="w-full flex flex-col gap-4 h-max sm:px-1 py-2 justify-center">
                    <div
                        className="py-3 px-2 rounded-lg cursor-pointer
                        outline-2 cs-outline secondary-text w-full"
                        onClick={() => {
                            globalContext.storeDispatch(
                                updateMoods({
                                    create: "form",
                                }),
                            )
                        }}
                    >
                        <p className="max-w-fit cs-text-muted truncate ">
                            {"What's"} on your mind? {capitalize("Mahamed")}...
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {[
                            {
                                name: "addPhoto",
                                title: "Media",
                                color: "fill-[var(--primary)]",
                                onClick: (ev: any) => {
                                    globalContext.storeDispatch(
                                        updateMoods({
                                            create: "photo",
                                        }),
                                    )
                                },
                            },
                            {
                                name: "emojiSmile",
                                title: "Media",
                                color: "fill-[var(--primary)]",
                            },
                            {
                                name: "hashtag",
                                title: "Media",
                                color: "fill-[var(--primary)]",
                            },
                            {
                                name: "calender",
                                title: "Media",
                                color: "fill-[var(--primary)]",
                            },
                        ].map((icon, i) => {
                            return (
                                <button
                                    key={i}
                                    title={capitalize(icon.title)}
                                    className="mx-1"
                                    onClick={icon.onClick || (() => {})}
                                >
                                    <Icon
                                        name={icon.name}
                                        className={`w-[1rem] ${icon.color}`}
                                    />
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            <span className="cs-divider"></span>
        </div>
    )
}
