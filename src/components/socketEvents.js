import * as aTS from './utils/actionTypesSocket';
import {store} from '../store';
import * as articleActions from './home/article-actions';
import { NotifyMe } from './common/notifyMe';

const socketEvents = (socket) => {

    socket.on(aTS.FETCH_MORE_LINKS_SUCCESS, (data) => {
        console.log('[FETCH_MORE_LINKS_SUCCESS]: ' ,data);
        const {article} = data;
        store.dispatch(articleActions.pushArticle({article}));
    });

    socket.on(aTS.FETCH_MORE_LINKS_FAIL, (data) => {
        console.log('[FETCH_MORE_LINKS_FAIL]: ' ,data);
        NotifyMe("error", "Error in getting articles.");
    });
    
}

export default socketEvents;