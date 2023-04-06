import { useRef, useEffect, useState } from "react"

type DropdownItem = {
    text: JSX.Element | string
    icon: JSX.Element | string
    onClicked?: () => void
}

type Props = {
    button: null | string | JSX.Element
    onDropped: (ev: any) => void
    btnParentClass: string
    items: DropdownItem[]
    jsxContent: null | JSX.Element
    identifier: string
    title?: string
    options: {
        left?: string
        top?: string
        right?: string
        bottom?: string
        animationDuration?: string
        startCoordinateY?: string
        endCoordinateY?: string
        startCoordinateX?: string
        endCoordinateX?: string
    }
}

export default function Dropdown({
    button,
    identifier,
    btnParentClass,
    items,
    title,
    jsxContent,
    options,
}: Props) {
    const [isActive, setActive] = useState(false)
    const contentRef = useRef(document.createElement("div"))

    useEffect(() => {
        // setStyles()
        if (isActive) {
            document.addEventListener("click", awaitExitEvent)

            setStyles(contentRef.current, options)
        }

        return () => document.removeEventListener("click", awaitExitEvent)

        // eslint-disable-next-line
    }, [isActive])

    function awaitExitEvent({ target }: any) {
        const currentDropdown = target.closest("[data-dropdown]")
        if (!currentDropdown) {
            setActive(false)
            return
        }
        document
            .querySelectorAll("[data-dropdown].active")
            .forEach((dropdown) => {
                if (dropdown === currentDropdown) return
                dropdown.classList.remove("active")
            })
    }

    function toggleDropDown() {
        setActive((prev) => !prev)
    }

    function handleItemClicked(ev: any, item: any) {
        item.onClicked(ev)
        setActive(false)
    }

    return (
        <span
            id={identifier}
            data-dropdown
            className={`dropdown w-full ${(isActive && "active") || ""}`}
        >
            <button
                title={title}
                className={btnParentClass}
                onClick={toggleDropDown}
            >
                {button}
            </button>
            {!!isActive && (
                <div
                    ref={contentRef}
                    className="dropdown-menu cs-border border-[1px] shadow-lg"
                >
                    {items.map((item, idx) => (
                        <span key={idx}>
                            {item && (
                                <div
                                    className="dropdown-item"
                                    onClick={(ev) =>
                                        handleItemClicked(ev, item)
                                    }
                                >
                                    <span>{item.text}</span>
                                    <span>{item.icon}</span>
                                </div>
                            )}
                        </span>
                    ))}
                    {!!isActive && (
                        <>
                            {!items.length && !!jsxContent && (
                                <div
                                    onClick={() => setActive(false)}
                                    className="dropdown-item_"
                                >
                                    {jsxContent}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </span>
    )
}

Dropdown.defaultProps = {
    button: null,
    onDropped: (ev: any) => {},
    identifier: "",
    btnParentClass: "",
    items: [],
    jsxContent: undefined,
    options: {
        left: null,
        top: null,
        right: null,
        bottom: null,
        animationDuration: null,
        startCoordinateY: null,
        endCoordinateY: null,
        startCoordinateX: null,
        endCoordinateX: null,
    },
}

function setStyles(content: HTMLDivElement, options: Props["options"]) {
    if (options.left) {
        content.style.setProperty("left", options.left)
    }
    if (options.top) {
        content.style.setProperty("--Top", options.top)
    }
    if (options.right) {
        content.style.setProperty("right", options.right)
    }
    if (options.bottom) {
        content.style.setProperty("bottom", options.bottom)
    }
    if (options.animationDuration) {
        content.style.setProperty(
            "--transition-duration",
            options.animationDuration,
        )
    }
    if (options.startCoordinateX) {
        content.style.setProperty(
            "--starting-point-Xcor",
            options.startCoordinateX,
        )
    }
    if (options.startCoordinateY) {
        content.style.setProperty(
            "--starting-point-Ycor",
            options.startCoordinateY,
        )
    }
    if (options.endCoordinateX) {
        content.style.setProperty("--ending-point-Xcor", options.endCoordinateX)
    }
    if (options.endCoordinateY) {
        content.style.setProperty("--ending-point-Ycor", options.endCoordinateY)
    }

    // if (options.boxShadow === false) {
    // 	content.current.style.setProperty('box-shadow', 'none')
    // }
}
