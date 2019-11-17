import * as aTS from './utils/actionTypesSocket';
import {store} from '../store';
import * as articleActions from './home/article-actions';
import { NotifyMe } from './common/notifyMe';
import { blink_logo, blink_desc } from './utils/effects';

const socketEvents = (socket) => {

    socket.on(aTS.FETCH_MORE_LINKS_SUCCESS, (data) => {
        console.log('[FETCH_MORE_LINKS_SUCCESS]: ' ,data);
        const {links, tag } = data;
        blink_desc();
        const {primary_tag} = store.getState().articles;

        if(primary_tag === tag){
            store.dispatch(articleActions.pushPendingArticleList({ links }));
        }
    });

    socket.on(aTS.FETCH_MORE_LINKS_FAIL, (data) => {
        console.log('[FETCH_MORE_LINKS_FAIL]: ' ,data);
        NotifyMe("error", "Error fetching links.");
    });
    

    socket.on(aTS.CRAWL_STORY_SUCCESS, (data) => {
        console.log('[CRAWL_STORY_SUCCESS]: ', data);
        const {article, tag} = data;
        // console.log('article : ', article );
        blink_desc();
        const {primary_tag} = store.getState().articles;
        store.dispatch(articleActions.startCrawling() );
        if(primary_tag === tag){
            store.dispatch(articleActions.pushArticle({article}));
        }
    });

    socket.on(aTS.CRAWL_STORY_FAIL, (data) => {
        console.log('[CRAWL_STORY_FAIL]: ' ,data);
        NotifyMe("error", "Unable to crawl story.");
    });
    

    socket.on(aTS.GET_RELATED_TAGS_SUCCESS, (data) => {
        console.log('[GET_RELATED_TAGS_SUCCESS]: ');
        const {related_tags} = data;
        blink_desc();
        store.dispatch(articleActions.setRelatedTags({related_tags}));
    });


    socket.on(aTS.BLOG_HTML_SUCCESS, (data) => {
        console.log('[BLOG_HTML_SUCCESS]: ');
        const {blog_html, blog_style} = data;
        blink_desc();
        store.dispatch(articleActions.setBlogHtml({blog_html}));
        store.dispatch(articleActions.setBlogStyle({ blog_style}));
    });
    
    socket.on(aTS.BLOG_HTML_FAIL, (data) => {
        console.log('[BLOG_HTML_FAIL]: ' ,data);
        NotifyMe("err", "Error fetching blog html.");
    });


    socket.on(aTS.GET_RESPONSES_SUCCESS, (data) => {
        console.log('[GET_RESPONSES_SUCCESS]: ');
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