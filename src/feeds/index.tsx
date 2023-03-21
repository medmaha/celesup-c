import { useContext, useEffect } from "react"
import { GlobalContext } from "../layouts/context"
import Compose from "../components/UI/Compose"
import Suggestions from "../apps/suggestions"
import PostContainer from "../apps/posts"

export default function Index() {
    const globalContext = useContext(GlobalContext)

    return (
        <div id="indexPage" className="w-full flex justify-evenly md:gap-2">
            {/* <div className="flex-1 p-1 hidden lg:inline-flex basis-[280px] max-w-[300px]">
                <div className="flex.justify-content-center lg:p-2">
                    If you need to use a one-off flex-basis value that
                    {" doesn't "}make sense to include in.
                </div>
            </div> */}
            {globalContext.user && (
                <div className="flex-1 flex flex-col gap-[.4rem] items-center lg:basis-[550px] min-h-[100vh] max-w-[610px]">
                    <Compose />
                    <PostContainer />
                </div>
            )}

            {/* <div className="flex-1 justify-center w-full hidden md:inline-flex basis-[300px] min-w-[300px] md:max-w-[320px] lg:max-w-[380px]">
                <div className="flex justify-center lg:p-2 lg:pr-1 h-max flex-col w-full">
                    <Suggestions />
                </div>
            </div> */}
        </div>
    )
}
