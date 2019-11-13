import * as aTS from './utils/actionTypesSocket';
import {store} from '../store';
import * as articleActions from './home/article-actions';
import { NotifyMe } from './common/notifyMe';
import { blink_logo } from './utils/effects';

const socketEvents = (socket) => {

    socket.on(aTS.FETCH_MORE_LINKS_SUCCESS, (data) => {
        console.log('[FETCH_MORE_LINKS_SUCCESS]: ' ,data);
        const {article, tag} = data;
        blink_logo();
        const {input_tag} = store.getState().articles;
        if(input_tag === tag){
            store.dispatch(articleActions.pushArticle({article}));
        }
    });

    socket.on(aTS.FETCH_MORE_LINKS_FAIL, (data) => {
        console.log('[FETCH_MORE_LINKS_FAIL]: ' ,data);
        NotifyMe("error", "Error in getting articles.");
    });
    

    socket.on(aTS.GET_RELATED_TAGS_SUCCESS, (data) => {
        console.log('[GET_RELATED_TAGS_SUCCESS]: ' ,data);
        const {related_tags} = data;
        store.dispatch(articleActions.setRelatedTags({related_tags}));
    });
}

export default socketEvents;