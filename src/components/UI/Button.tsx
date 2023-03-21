import React from "react"
import { changeClassName } from "../../library/texts"

type Props = {
    text: string
    onClick: () => void
    className: string
    disabled: boolean
    readonly __class: "cs-button font-semibold capitalize"
}

function Button(props: Props) {
    const { className, text, __class, ...resProps } = props

    const _class = changeClassName(className, __class)

    return (
        <button {...resProps} className={_class}>
            {text}
        </button>
    )
}

Button.defaultProps = {
    text: "Button",
    onClick: () => {},
    className: "",
    __class: "cs-button font-semibold capitalize",
    disabled: false,
}
export default Button
