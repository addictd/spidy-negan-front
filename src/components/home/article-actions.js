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



export const setArticle = ({ articles }) => ({
    type: aT.SET_ARTICLES,
    data: articles
})



export const fetchMoreLinks = ({ tag }) => {
    return (dispatch, getState) => {
        
        var {articles, primary_tag} = getState().articles;

        const more_count = 10;
        let count = articles.length + more_count;
        if( primary_tag !== tag){
            count = more_count;
        }
        const _data = {tag, count};
        _data[config.TOKEN] = ls_get(config.TOKEN);
        socket.emit(aTS.FETCH_MORE_LINKS, _data );
        
        if ( primary_tag !== tag) {

            dispatch(setPrimaryTag({ tag }));  //set primary tag
            dispatch(setArticle({ articles: [] }));
            dispatch(setFilteredArticles({ articles: [] }));
            dispatch(setRelatedTags({ related_tags: [] }));
            
        }
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
        socket.emit(aTS.GET_RESPONSES, { id })
    }
};


export const setBlogResponse = ({ blog_response }) => ({
    type: aT.SET_BLOG_RESPONSE,
    data: blog_response
});

export const setPrimaryTag = ({ tag }) => ({
    type: aT.SET_PRIMARY_TAG,
    data: tag
})

export const pushPendingArticleList = ({links}) => {
    return (dispatch, getState) => {
        const {articles } = getState().articles;
        
        links = links.filter(item => {
            let status = true;
            for(let i=0; i< articles.length; i++){
                if(item.id === articles[i].identifier ){
                    status = false;
                }
            }
            return status;
        });

        for(let i=0 ;i < links.length ; i++){
            links[i].crawl_status = 'pending';
            dispatch(pushPendingArticle({article : links[i] }));
        }

        setTimeout(() => {
            console.log('reached here.');
            dispatch( startCrawling() );
        }, 1000);
    }
}

const pushPendingArticle = ({article}) => ({
    type : aT.PUSH_ARTICLE,
    data : article
})

const _indexOfFirstPending = (articles) => {
    let index = undefined;
    for(let i=0; i< articles.length; i++){
        if(articles[i].crawl_status === 'pending'){
            index = i;
            break;
        }
    }
    return index;
}
export const startCrawling = () => {
    return (dispatch, getState) => {
        const {articles, primary_tag} = getState().articles;
        const index = _indexOfFirstPending(articles);
        console.log('index : ', index);
        if(index !== undefined){
            const {url, id} = articles[index];
            console.log('[CRAWLING STARTED]: ', url);
            socket.emit(aTS.CRAWL_STORY, {url,id, tag : primary_tag});
            dispatch(pushCrawlingArticle({
                crawl_status : 'crawling',
                index 
            }));
        }
    }
}

const pushCrawlingArticle = (data) => ({
    type : aT.PUSH_ARTICLE,
    data 
})

export const pushArticle = ({ article }) => {
    return dispatch => {
        dispatch(_pushArticle({ article }));
    }
};

export const _pushArticle = ({ article }) => ({
    type: aT.PUSH_ARTICLE,
    data: article
});


export const fetchHtml = ({url }) => {
    return dispatch => {
        socket.emit(aTS.BLOG_HTML, {url});
    }
}

export const setBlogHtml = ({blog_html}) => ({
    type : aT.SET_BLOG_HTML,
    data : blog_html
})
export const setBlogStyle = ({blog_style}) => ({
    type : aT.SET_BLOG_STYLE,
    data : blog_style
})