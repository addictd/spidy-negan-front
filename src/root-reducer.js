import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import articleReducer from './components/reducers/article-reducer';
import userReducer from './components/reducers/user-reducer';

const rootReducer = (history) =>( combineReducers({
    router: connectRouter(history),
    articles : articleReducer,
    user : userReducer
}))

export default rootReducer;
