import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Auth from './auth/auth';
import Home from './home/home';


class Routes extends Component {
    componentDidMount() {
        // const { store } = this.props;
        // console.log('here', store.dispatch);
        // store.dispatch();
    }

    render() {
        return (<Switch>
            <Route path='/signin' component={Auth} />
            <Route path='/' component={Home} />
        </Switch>);
    }
}

export default Routes;