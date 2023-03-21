// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

export default async function handler(req, res) {
    const form = { email: "admin@admin.com", password: "admin" }

    await axios
        .post("https://mahamedtoure.pythonanywhere.com/login", form, {
            headers: { "Content-Type": "application/json" },
        })
        .then((_res) => {
            const cookies = _res.headers["set-cookie"] || []
            cookies.forEach((cookie) => {
                console.log(cookie)
                res.setHeader("Set-Cookie", cookie)
            })
            res.status(200).json({ Celesup: "Welcome to Celesup Api" })
        })
        .catch((err) => {
            console.log(err.message)
        })
        .finally(() => {
            Promise.resolve()
        })
}

