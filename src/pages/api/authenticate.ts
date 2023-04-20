// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

export default async function handler(req: any, res: any) {
    const authCookie = "d14d4da5j7j9j2d7th9v1s4t82v3s4r7h85m"
    res.setHeader(
        "Set-Cookie",
        "sid" +
            authCookie +
            ";sameSite=strick;httpOnly=true;secure=" +
            process.env.NODE_ENV ===
            "production",
    )
    res.status(200).end()
}
