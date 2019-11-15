import * as aT from "../utils/actionTypes";
import socket from '../../socketHandler';
import * as aTS from '../utils/actionTypesSocket';
import config from '../../../config';
import { ls_get } from "../services/ls-service";
import * as indexActions from '../index-actions';

export const onChangeInput = ({ value }) => ({
    type: aT.SET_INPUT_TAGS,
    data: { value }
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
        dispatch(_pushArticle({ article }));
    }
};


export const setArticle = ({ articles }) => ({
    type: aT.SET_ARTICLES,
    data: articles
})


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
        _data[config.TOKEN] = ls_get(config.TOKEN)
        socket.emit(aTS.FETCH_MORE_LINKS, _data);

        if (getState().articles.input_tag !== tag) {
            dispatch(setArticle({ articles: [] }));
        }
        dispatch(setFilteredArticles({ articles: [] }));
        dispatch(indexActions.pushActivity({ keyword: tag }));

        for (let i = 0; i < more_count; i++) {
            dispatch(_pushArticle({
                article: {
                    crawl_status: 'wait',
                    identifier: ''
                }
            }))
        }
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

export const setShowFiltered = ({ status }) => ({
    type: aT.SET_SHOW_FILTERED,
    data: status
})

export const setFilteredArticles = ({ articles }) => ({
    type: aT.SET_FILTERED_ARTICLES,
    data: articles
})  



export const fetchResponses = ({ id }) => {
    return dispatch => {
        socket.emit(aTS.GET_RESPONSES, {id})
    }
};


export const setBlogResponse = ({blog_response}) => ({
    type : aT.SET_BLOG_RESPONSE,
    data : blog_response
}) 