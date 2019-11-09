import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Auth from './auth/auth';
import Home from './home/home';


class Routes extends Component{
    render(){
        return (<Switch>
            <Route path='/signin' component={Auth} />
            <Route path='/' component={Home} />
        </Switch>);
    }
}

export default Routes;