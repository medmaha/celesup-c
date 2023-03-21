import type { GlobalContext } from "../types/global"

export const AppContext = <GlobalContext>{
    tokens: {
        ata: "",
        atr: "",
    },
    user: {
        id: "",
        name: "",
        avatar: "",
        username: "",
    },
    activeLink: "home",
    moods: {
        create: false,
        updateFeeds: false,
        playingAudio: false,

        loadingRequest: false,
        errorMessage: false,
        successMessage: false,
        infoMessage: false,
    },
    storeDispatch: (action) => {},
    updateAuthUser: (payload) => {},
    updateAuthTokens: (payload) => {},
}
