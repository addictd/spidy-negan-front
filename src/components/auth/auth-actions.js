import { getAllUsers, signIn, signUp } from "../common/api/api";
import { NotifyMe } from "../common/notifyMe";
import { ls_set, ls_clear } from "../services/ls-service";
import config from '../../../config';
import {replace, push } from "connected-react-router";
import * as socketServices from '../services/socketServices';

export const signin = ({email, password}) => {
    return async dispatch => {
        try{
            const response = await signIn({email, password});
            const {data, msg, status} = response['data'];
            console.log('[signIn] response: ', data);
            if(!status) throw msg;

            NotifyMe('success', msg);
            ls_set([config.TOKEN], data.token);
            dispatch(replace("/home"));
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
            NotifyMe('success', "Successfully logged out.");
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

export const emitEvent1 = () => {
    return dispatch => {
        console.log('emitted');
        socketServices.sendevent1({msg : "event1"});
    }
}