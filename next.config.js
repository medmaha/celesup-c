/** @type {import('next').NextConfig} */

const path = require("path")
// const withSession = require("next-session")

const nextConfig = {
    // reactStrictMode: true,

    // headers: async function () {
    //     return [
    //         {
    //             source: "/:path*",
    //             // headers: [
    //             //     {
    //             //         key: "Access-Control-Allow-Headers",
    //             //         value: "content-type,authorization,x-csrftoken,celesup-api,origin",
    //             //     },
    //             // ],
    //         },
    //     ]
    // },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        domains: (() => {
            const domain = process.env.IMAGE_DOMAINS
            return domain.split(",")
        })(),
    },
    env: {
        CELESUP_BACKEND_URL: process.env.CELESUP_BACKEND_URL,
        CELESUP_FRONTEND_URL: process.env.CELESUP_FRONTEND_URL,
        CS_CRYPTO_KEY: process.env.CS_CRYPTO_KEY,
        IMAGE_DOMAINS: process.env.IMAGE_DOMAINS,
    },
}

module.exports = nextConfig

