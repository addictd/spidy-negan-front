import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Auth from './auth/auth';
import Signout from './auth/signout';
import Home from './home/home';
import Blog from './blog/blog';


class Routes extends Component {
    componentDidMount() {
        // const { store } = this.props;
    }

    render() {
        return (<Switch>
            <Route path='/signin' component={Auth} />
            <Route path='/signout' component={Signout } />
            <Route path='/article/:id' component={Blog} />
            <Route path='/' component={Home} />
        </Switch>);
    }
}

export default Routes;