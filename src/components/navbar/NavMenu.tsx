import React from "react"

type Props = {
    navDrawer: boolean
    toggleNavDrawer: (callback: (state: boolean) => boolean) => void
}

export default function NavMenu({ navDrawer, toggleNavDrawer }: Props) {
    return (
        <div className="inline-block md:hidden">
            <button
                onClick={() => {
                    toggleNavDrawer((prev) => !prev)
                }}
                className="active:border-none border-none focus:border-none"
            >
                <svg
                    className={navDrawer ? `fill-sky-500` : "fill-current"}
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                >
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
            </button>
        </div>
    )
}
