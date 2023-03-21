import { createSlice } from "@reduxjs/toolkit"
import { AuthUser } from "../types/user"

const COOKIES = { set() {}, get() {}, erase() {} }

type AuthTokens =
    | {}
    | {
          ata: string
          atr: string
      }

const tokens = {} as AuthTokens
const user = {} as AuthUser | {}

export const appSlice = createSlice({
    name: "app",
    initialState: {
        tokens: { ...tokens },

        // user: localStorage.getItem("ata")
        //     ? jwtDecode(localStorage.getItem("ata")).data
        //     : null,
        user: { ...user },

        activeLink: "home",

        moods: {
            createPost: false,
            create: false,
            updateFeeds: false,
            playingAudio: false,

            loadingRequest: false,
            errorMessage: false,
            successMessage: false,
            infoMessage: false,
        },
    },

    reducers: {
        updateAuthUser: (state, action) => {
            state.user = action.payload.user || null
        },
        updateAuthTokens: (state, action) => {
            if (action.payload.dispatch) {
                state.tokens = {}
                state.user = {}
            } else {
                if (action.payload.access) {
                    state.tokens = action.payload
                    // localStorage.setItem("ata", action.payload.access)
                    // localStorage.setItem("atr", action.payload.refresh)
                    // ? update the user as well
                    // state.user = jwtDecode(action.payload.access).data
                }
            }
        },

        updateActiveLink(state, action) {
            const activeLink = state.activeLink
            const currentLink = action.payload.data

            const activeLinkElement = document.querySelector(
                `nav [data-link="${activeLink}"]`,
            )

            const currentLinkElement = document.querySelector(
                `nav [data-link="${currentLink}"]`,
            )

            if (activeLinkElement && currentLinkElement) {
                activeLinkElement.classList.remove("active")
                currentLinkElement.classList.add("active")
            }

            state.activeLink = currentLink
        },

        updateMoods(state, action) {
            if (action.payload.dispatch) {
                state.moods = {
                    createPost: false,
                    create: false,
                    playingAudio: false,

                    loadingRequest: false,
                    errorMessage: false,
                    successMessage: false,
                    infoMessage: false,
                    updateFeeds: false,
                }
            } else {
                state.moods = {
                    ...state.moods,
                    ...action.payload,
                }
            }
        },
    },
})

export const {
    updateAuthUser,
    updateAuthTokens,
    updateMoods,
    updateActiveLink,
} = appSlice.actions
export default appSlice.reducer
