//
export default class CSTypography {
    static capitalize(value: string) {
        let data: string[]

        if (!!value.length) {
            const _data = value.toLowerCase()
            data = _data.split("")
        } else {
            return value
        }

        data[0] = data[0].toUpperCase()
        return data.join("")
    }
}
