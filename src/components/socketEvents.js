import * as aTS from './utils/actionTypesSocket';
import {store} from '../store';
import * as articleActions from './home/article-actions';
import { NotifyMe } from './common/notifyMe';

const socketEvents = (socket) => {

    socket.on(aTS.SEARCH_TAG_SUCCESS, (data) => {
        console.log('[SEARCH_TAG_SUCCESS]: ' ,data);
        const {tags} = data;
        store.dispatch(articleActions.setAvailableTags({tags}));
    });

    socket.on(aTS.SEARCH_TAG_FAIL, (data) => {
        console.log('[SEARCH_TAG_FAIL]: ' ,data);
        NotifyMe("error", "Error in looking up tag.");
    });

    socket.on(aTS.GET_ARTICLES_SUCCESS, (data) => {
        console.log('[GET_ARTICLES_SUCCESS]: ' ,data);
        const {article} = data;
        store.dispatch(articleActions.pushArticle({article}));
    });

    socket.on(aTS.GET_ARTICLES_FAIL, (data) => {
        console.log('[GET_ARTICLES_FAIL]: ' ,data);
        NotifyMe("error", "Error in getting articles.");
    });
    
}

export default socketEvents;