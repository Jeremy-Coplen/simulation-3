const UPDATE_STATE = "UPDATE_STATE"

export function updateState(id, username, picture) {
    return {
        type: UPDATE_STATE,
        payload: {id, username, picture}
    }
}

const initialState = {
    id: 0,
    username: "",
    picture: ""
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_STATE: {
            console.log(action.payload)
            return Object.assign({}, state, action.payload)
        }
        default: return state
    }
}