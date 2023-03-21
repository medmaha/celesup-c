//

import { celesupBackendApi } from "../axiosConfig"

export default async function fetchRequest(options = {}) {
    const { url, method, data, config } = options

    if (!url) return Promise.resolve()

    return new Promise((resolve) => {
        celesupBackendApi({
            url,
            method,
            data,
            headers: config?.headers || {},
        })
            .then(
                (res) => {
                    resolve(res)
                },
                (error) => {
                    const message =
                        error.response?.data?.message || error.message
                    resolve({ error: message })
                },
            )
            .catch((error) => {
                const message = error.response?.data?.message || error.message
                resolve({ error: message })
            })
    })
}
