import { replace } from "connected-react-router";
import config from '../../../config';
import { getAllUsers, signIn, signUp } from "../common/api/api";
import { NotifyMe } from "../common/notifyMe";
import { ls_clear, ls_set } from "../services/ls-service";

export const signin = ({email, password}) => {
    return async dispatch => {
        try{
            const response = await signIn({email, password});
            const {data, msg, status} = response['data'];
            console.log('[signIn] response: ', data);
            if(!status) throw msg;

            NotifyMe('success', msg);
            ls_set(config.TOKEN, data.token);
            dispatch(replace("/"));
        }catch(err){
            console.log('[err][signin]: ', err);
            NotifyMe('error', err.toString() );
        }
    }
}

export const signup = ({email, password, name}) => {
    return async dispatch => {
        try{
            const response = await signUp({email, password, name});
            const {data, msg, status} = response['data'];

            if(!status) throw msg;
            console.log('[signIn] response: ', data);
            NotifyMe('success', msg);

        }catch(err){
            console.log('[err][signUp]: ', err);
            NotifyMe('error', err.toString() );
        }
    }
}

export const signout = () => {
    return async dispatch => {
        try{
            ls_clear();
            // NotifyMe('success', "Successfully logged out.");
            dispatch(replace("/signin"));
        }catch(err){
            console.log('[err][signout]: ', err);
            NotifyMe('error', err.toString() );
        }
    }
}

export const allUsers = () => {
    return async dispatch => {
        try{
            const response = await getAllUsers();
            const {data, msg, status} = response['data'];
            console.log('[signIn] response: ', data);

            if(!status) throw msg;
            NotifyMe('success', msg);

        }catch(err){
            console.log('[err][allUsers]: ', err);
            NotifyMe('error', err.toString() );

        }
    }
}


