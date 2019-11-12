import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Auth from './auth/auth';
import Home from './home/home';
import Signout from './auth/signout';
import { ls_get } from './services/ls-service';
import config from '../../config';


class Routes extends Component {
    componentDidMount() {
        // const { store } = this.props;
    }

    render() {

        const { dispatch } = this.props.store;
        return (<Switch>
            <Route path='/signin' component={Auth} />
            <Route path='/signout' component={Signout } />
            <Route path='/' component={ ls_get(config.TOKEN) ? Home : Signout} />
        </Switch>);
    }
}

export default Routes;