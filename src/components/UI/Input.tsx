import { changeClassName } from "../../library/texts"

function Input(props: any) {
    let { id, altText, className, ...restProps } = props

    if (!id) {
        id = Date.now()
    }

    const __class = changeClassName(className, props.__class)

    return <input id={id} alt={altText} className={__class} {...restProps} />
}

Input.defaultProps = {
    id: "",
    name: "",
    type: "text",
    className: "",
    disabled: false,
    onBlur: () => {},
    onInput: () => {},
    onClick: () => {},
    onChange: () => {},
    altText: "search bar",
    __class: "cs-input w-full",
    placeholder: "Search celesup",
}

export default Input
