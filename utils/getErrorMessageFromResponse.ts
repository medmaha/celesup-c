type ERROR = {
    message: string
    response?: {
        data: {
            message: string
            detail: string
        }
        status: number
    }
    request?: object
}

export function getErrorMessageFromRequest(err: ERROR): string {
    if (err.response?.data.message) {
        return err.response?.data.message
    } else if (err.response?.data.detail) {
        return err.response?.data.message
    } else if (err.request) {
        console.error(err.message)
        return "Unable to connect to the server!"
    } else {
        return err.message
    }
}
