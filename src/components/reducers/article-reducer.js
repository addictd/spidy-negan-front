import * as aT from "../utils/actionTypes";

const update = (prevState, newState) => ({...prevState, ...newState});

const initialState = {
    input_tag : '',  // look for tag
    available_tags :[],
    articles : [],
    primary_tag: ''

}   


const articleReducer = (state = initialState, action) => {
    switch(action.type){
        case aT.SET_INPUT_TAGS : return update(state, { input_tag : action.data.value }); break;

        case aT.SET_AVAILABLE_TAGS: return update(state, {available_tags : [...action.data] }); break;

        case aT.SET_PRIMARY_TAG: return update(state, {primary_tag : action.data.tag }); break;

        case aT.PUSH_ARTICLE : {
            const newState = Object.assign({}, state);
            const new_articles = [...newState.articles, {...action.data}];
            newState.articles = new_articles;
            return newState;
        }
        default : return state;
    }
}

export default articleReducer;