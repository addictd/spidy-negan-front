import * as aT from "../utils/actionTypes";
import socket from '../../socketHandler';
import * as aTS from '../utils/actionTypesSocket';

export const onChangeInput = ({ type, value }) => ({
    type: aT.SET_INPUT_TAGS,
    data: { type, value }
})

export const pushArticle = ({ article }) => ({
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