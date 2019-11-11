import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import articleReducer from './components/reducers/article-reducer';

const rootReducer = (history) =>( combineReducers({
    router: connectRouter(history),
    articles : articleReducer
}))

export default rootReducer;
