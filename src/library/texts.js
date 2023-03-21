//
// ? capitalized a given text
export function capitalize(value = "") {
    let data = ""
    if (value && value.length) {
        data = value.toLowerCase()
        data = data.split("")
    } else {
        return data
    }

    data[0] = data[0].toUpperCase()
    return data.join("")
}

//
// ? override Tailwinds calls
export function changeClassName(
    className,
    originalClassName,
    originalRegExPattern = /[tbrpmgfha]\w{0,}[:[-].\w{0,}[-]?\w{0,}[[\]]?/g,
) {
    let computedClass = originalClassName

    const map = className.trim().split(" ")

    if (!!map.length) {
        map.forEach((match) => {
            if (!match) return
            if (!match.trim().match(originalRegExPattern)) {
                computedClass += ` ${match.trim()} `
                return
            }

            /**
             *  @regKey the start/name of the class eg (p, m, py, rounded) ext
             */
            const regKey = new RegExp(`${match.match(/^(\w{0,})/g)}`)

            /**
             * @query create regex query for class replacement
             */
            const query = new RegExp(
                `(${regKey.source})-` + /.?\w{0,}-?\w{0,}.?(?<!\s)/.source,
                "g",
            )

            /**
             * @query split the new class string to chunk of words for iteration
             */
            const classes = originalClassName.trim().split(" ")
            let computed = false
            // iterates over the class list
            for (let _class of classes) {
                if (_class.match(query)) {
                    computed = true
                    computedClass = computedClass.replace(query, match)
                }
            }

            if (!computed) {
                computedClass += ` ${match} `
            }
        })
    } else {
        computedClass += ` ${className}`
    }

    return computedClass.trim()
}
