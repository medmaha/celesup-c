//

// ? Client side cookie handler

export default class CSCookies {
    static set(config: any) {
        const options = {
            name: "",
            value: "",
            expires: 1,
            path: "/",
            sameSite: "Lax",
            secure: false,
            ...config,
        }

        var expiresDate = new Date()
        expiresDate.setTime(
            expiresDate.getTime() + options.expires * 24 * 60 * 60 * 1000,
        )
        var expiresString = options.expires
            ? "; expires=" + expiresDate.toUTCString()
            : ""
        var pathString = options.path ? "; path=" + options.path : ""
        var sameSiteString = options.sameSite
            ? "; sameSite=" + options.sameSite
            : ""
        var secureString = options.secure ? "; secure" : ""
        document.cookie =
            options.name +
            "=" +
            options.value +
            expiresString +
            pathString +
            sameSiteString +
            secureString
    }
    static get(name: string) {
        var nameEQ = name + "="
        var ca = document.cookie.split(";")
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) == " ") c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length)
        }
        return null
    }
    static del(name: string) {
        document.cookie =
            name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    }
}
