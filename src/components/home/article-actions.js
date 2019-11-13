import * as aT from "../utils/actionTypes";
import socket from '../../socketHandler';
import * as aTS from '../utils/actionTypesSocket';

export const onChangeInput = ({ type, value }) => ({
    type: aT.SET_INPUT_TAGS,
    data: { type, value }
})

export const pushArticle = ({ article }) => {
    return dispatch => {
        const _keywords = article.keywords.filter(item => {
            if (item.split(":")[0] === 'Tag') return true;
            return false;
        })
        .map(tag => tag.split(':')[1]);
        article.keywords = _keywords;
        console.log('article: ', article);
        dispatch(_pushArticle({article }));
    }
};

export const _pushArticle = ({ article }) => ({
    type: aT.PUSH_ARTICLE,
    data: article
});

export const fetchMoreLinks = ({ tag }) => {
    return (dispatch, getState) => {
        try {
            var fetched_article_id = getState().articles.articles.map(item => item.identifier);
        } catch (err) {
            console.log('fetched_article_id is throwing error.');
        }
        const more_count = 10;
        const _data = {
            tag,
            fetched_ids: fetched_article_id,
            count: fetched_article_id.length + more_count
        };
        console.log(aTS.FETCH_MORE_LINKS, tag);
        socket.emit(aTS.FETCH_MORE_LINKS, _data);
    }
}

export const setRelatedTags = ({ related_tags }) => ({
    type: aT.SET_AVAILABLE_TAGS,
    data: related_tags
})

export const onChangeFilterInput = ({ key, value }) => ({
    type: aT.SET_FILTER_INPUT,
    data: { key, value }
})

export const setShowFiltered = (_bool) => ({
    type: aT.SET_SHOW_FILTERED,
    data: _bool
})

export const setFilteredArticles = (obj) => ({
    type: aT.SET_FILTERED_ARTICLES,
    data: obj
})