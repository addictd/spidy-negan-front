import * as aT from "../utils/actionTypes";
import socket from '../../socketHandler';
import * as aTS from '../utils/actionTypesSocket';

export const onChangeInput = ({type, value}) => ({
    type : aT.SET_INPUT_TAGS,
    data : {type, value}
})

export const onSearchTag = ({tag}) => {
    return dispatch => {
        console.log(aTS.SEARCH_TAG, tag);
        socket.emit(aTS.SEARCH_TAG , {tag});
    }
}

export const setAvailableTags = ({tags}) => ({
    type : aT.SET_AVAILABLE_TAGS,
    data : {tags}
});

export const setPrimaryTag = ({tag}) => ({
    type : aT.SET_PRIMARY_TAG,
    data : {tag}
})

export const getArticlesList =({tag}) => {
    return dispatch => {
        dispatch(setPrimaryTag({tag}));
        console.log(aTS.GET_ARTICLES, tag);
        socket.emit(aTS.GET_ARTICLES, {tag});
    }
}

export const pushArticle = ({article}) => ({
    type : aT.PUSH_ARTICLE,
    data : article
});