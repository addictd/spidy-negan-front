import * as aT from "../utils/actionTypes";

const update = (prevState, newState) => ({ ...prevState, ...newState });

const initialState = {
    activity : []
}



const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case aT.SET_ACTIVITY: return update(state, { activity: [...action.data] }); break;

        case aT.PUSH_ACTIVITY: return update(state, { activity: [...state.activity, action.data] }); break;

        default: return state;
    }
}

export default userReducer;