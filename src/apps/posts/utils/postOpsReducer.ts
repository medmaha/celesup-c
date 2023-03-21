//
export default function postOpsReducer(state: any, action: any): any {
    switch (action.type) {
        case "TOGGLE_COMMENT":
            return {
                ...state,
                showComments: !!state.showComments ? false : true,
            }

        default:
            return state
    }
}
