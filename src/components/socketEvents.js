import * as aTS from './utils/actionTypesSocket';
import {store} from '../store';
import * as articleActions from './home/article-actions';
import { NotifyMe } from './common/notifyMe';
import { blink_logo, blink_desc } from './utils/effects';

const socketEvents = (socket) => {

    socket.on(aTS.FETCH_MORE_LINKS_SUCCESS, (data) => {
        console.log('[FETCH_MORE_LINKS_SUCCESS]: ' ,data);
        const {article, tag} = data;
        // blink_logo();
        blink_desc();
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
        blink_desc();
        store.dispatch(articleActions.setRelatedTags({related_tags}));
    });


    socket.on(aTS.GET_RESPONSES_SUCCESS, (data) => {
        console.log('[GET_RESPONSES_SUCCESS]: ' ,data);
        const {blog_response} = data;
        blink_desc();
        store.dispatch(articleActions.setBlogResponse({blog_response}));
    });
    
    socket.on(aTS.GET_RESPONSES_FAIL, (data) => {
        console.log('[GET_RESPONSES_FAIL]: ' ,data);
        NotifyMe("err", "Error fetching response.");
    });
}

export default socketEvents;