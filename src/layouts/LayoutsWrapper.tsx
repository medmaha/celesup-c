import META from "./META"
import { Provider } from "react-redux"
import ContextProvider from "./context"
import AppsReduxStore from "../redux/store"
import Navbar from "../components/navbar/Navbar"

type Props = {
    children: any
}

export default function LayoutsWrapper({ children }: Props): JSX.Element {
    return (
        <Layout>
            <META />

            <Navbar />
            <div className="mt-[70px]"></div>
            <div className="flex justify-center mx-[5px] prose lg:prose-xl">
                <div className="mx-auto w-full prose lg:prose-xl">
                    {children}
                </div>
            </div>
        </Layout>
    )
}

function Layout({ children }: Props): JSX.Element {
    return (
        <>
            <Provider store={AppsReduxStore}>
                <ContextProvider>{children}</ContextProvider>
            </Provider>
        </>
    )
}
