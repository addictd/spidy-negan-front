const axios = require('axios');
import config from '../../../../config';
import { ls_get } from '../../services/ls-service';

const server_url = `${config.SERVER_URL}:${config.SERVER_PORT}`;

const callAPI = async function(method, url , data={}){
    // const token = ls_get(config.TOKEN);
    const token = ls_get(config.token);
    
    const configObj = {};
    configObj.method = method;
    configObj.url = url;
    configObj.baseURL = server_url;
    configObj.headers= {
      [config.TOKEN] : token
    }
    if(method !== "get"){
      configObj.data = data;
    }

    return axios(configObj);

};


export const signUp = ({email, password, name}) => callAPI('post', '/signup', {email, password, name}); 
export const signIn = ({email, password}) => callAPI('post', '/signin', {email, password});   
export const getAllUsers = () => callAPI('get', '/allusers');  
