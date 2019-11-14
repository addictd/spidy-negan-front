import { getUserActivity } from "./common/api/api"
import { NotifyMe } from "./common/notifyMe";
import * as aT from './utils/actionTypes';
import { ls_get } from "./services/ls-service";
import config from '../../config';

export const getActivity = () => {
    return async dispatch => {
        if(ls_get(config.TOKEN)){
            const response = await getUserActivity();
            const {data, msg, status} = response.data;
    
            if(!status){
                return NotifyMe("error", msg.toString() ); 
            }
            console.log('activity data:', data);
            dispatch(_setActivity({keywords: data}));
        }
    }
}

const _setActivity = ({keywords}) => ({
    type : aT.SET_ACTIVITY,
    data : keywords
})

export const pushActivity = ({keyword}) => {
    return (dispatch, getState) => {
        if (getState().user.activity.indexOf(keyword) === -1) {
            dispatch(_pushActivity({ keyword }));
        }
    }
};

const _pushActivity = ({keyword}) => ({
    type : aT.PUSH_ACTIVITY,
    data : keyword
})

