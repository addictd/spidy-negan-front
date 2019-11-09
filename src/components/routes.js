import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Auth from './auth/auth';


class Routes extends Component{
    render(){
        return (<Switch>
            <Route path='/signin' component={Auth} />
        </Switch>);
    }
}

export default Routes;