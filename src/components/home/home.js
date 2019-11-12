import React, { Component } from 'react';
import './home.scss';
import Filter from './filter/filter';
import Main from './main/main';
import { useHistory } from "react-router-dom";
import { ls_get } from '../services/ls-service';
import config from '../../../config';


const Home = (props) => {

let history = useHistory();

    if (!ls_get(config.TOKEN)) {
        history.push("/signout");
    }

    return <div className="home-wrapper">
        <div className="container-fluid home-body">
            <Filter />
            <Main />
        </div>
    </div>;
}



export default Home;