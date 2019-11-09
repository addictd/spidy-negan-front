import React, { Component } from 'react';
import './home.scss';
import Filter from './filter/filter';
import Main from './main/main';

class Home extends Component {
    render() {
        return <div className="home-wrapper">
            <div className="container-fluid home-body">
                <Filter />
                <Main />
            </div>
        </div>;
    }
}

export default Home;