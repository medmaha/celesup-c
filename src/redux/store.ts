import { configureStore } from "@reduxjs/toolkit"
import appSlice from "./app"
import createMediaSlice from "./create"

const AppStore = configureStore({
    reducer: {
        main: appSlice,
        create: createMediaSlice,
    },
})

export default AppStore
