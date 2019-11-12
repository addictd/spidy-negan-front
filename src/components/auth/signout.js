import { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from './auth-actions';

class SignOut extends Component {
    componentDidMount(){
        this.props.actions.signout();
    }
    render() {
        return '';
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignOut));