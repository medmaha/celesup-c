import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const originalRenderPage = ctx.renderPage

        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App: JSX.Element) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component: JSX.Element) => Component,
            })

        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }

    render() {
        return (
            <Html className="dark">
                <Head>
                    <title>Celesup</title>
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <body className="primary-bg primary-text">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument

