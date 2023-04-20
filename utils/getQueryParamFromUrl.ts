export function getQueryParamsFromUrl(url: string) {
    const data = {} as { [key: string]: string }
    try {
        const query_string = url.split("?")[1]
        const queries = query_string.split("&")

        for (const query of queries) {
            const [key, value] = query.split("=")
            if (key && value) {
                data[key] = value
            }
        }
        return data
    } catch (err) {
        return data
    }
}
