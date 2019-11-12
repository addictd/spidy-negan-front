import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Auth from './auth/auth';
import Home from './home/home';
import Signout from './auth/signout';
import { ls_get } from './services/ls-service';
import config from '../../config';

const checkAuth = (Home, Signout) => {
    if(ls_get(config.TOKEN)){
        return Home;
    }else{
        return Signout;
    }
}

class Routes extends Component {
    componentDidMount() {
        // const { store } = this.props;
    }

    render() {

        const { dispatch } = this.props.store;
        return (<Switch>
            <Route path='/signin' component={Auth} />
            <Route path='/signout' component={Signout } />
            <Route path='/' component={ checkAuth(Home, Signout) } />
        </Switch>);
    }
}

export default Routes;