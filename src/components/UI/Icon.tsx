import { changeClassName } from "../../library/texts"

import { iconsMap } from "../../../utils/iconsMap"

type Props = {
    className: string
    name: string
    readonly __class: "w-[1.1rem]"
}

function Icon({ className, name, __class }: Props) {
    const matchedIcon = iconsMap[name] || {}

    __class = changeClassName(className, __class)

    return (
        <svg
            className={__class}
            viewBox={matchedIcon.viewBox}
            xmlns="http://www.w3.org/2000/svg"
        >
            {matchedIcon.path}
        </svg>
    )
}

Icon.defaultProps = {
    name: "",
    className: "",
    __class: "w-[1.1rem]",
}

export default Icon
