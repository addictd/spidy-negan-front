import React, { Component } from 'react';
import Navbar from './common/navbar/navbar';
import Routes from './routes';
import * as userAction from './index-actions';


class Index extends Component {

    componentDidMount() {

        const { store } = this.props;
        store.dispatch(userAction.getActivity());
    }

    render() {
        const { store } = this.props;
        return (

            <Navbar >
                <Routes store={store} />
            </Navbar>

        );
    }
}

export default Index;