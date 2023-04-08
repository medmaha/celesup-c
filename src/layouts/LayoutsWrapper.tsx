import META from "./META"
import { Provider } from "react-redux"
import ContextProvider from "./context"
import AppsReduxStore from "../redux/store"
import Navbar from "../components/navbar"

type Props = {
    children: any
}

export default function LayoutsWrapper({ children }: Props): JSX.Element {
    return (
        <Layout>
            <META />

            <Navbar />
            <div className="mt-[5px]"></div>
            <div className="flex justify-center mx-[5px]">
                <div className="w-full">{children}</div>
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
