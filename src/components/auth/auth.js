import React, { Component } from 'react';
import './auth.scss';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from './auth-actions';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: 'default'
        };
    }
    onChange = e => {
        this.setState({ [e.currentTarget.getAttribute("type")]: e.target.value });
    }
    onSignIn = e => {
        this.props.actions.signin({
            email: this.state.email,
            password: this.state.password
        })
    }
    onSignUp = e => {
        this.props.actions.signup({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        })
    }
    render() {
        // console.log('this.state' , this.state);
        return <div className="auth-wrapper">
            <div className="auth-body">
                <div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={this.onChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={this.onChange} />
                    </div>
                    <div className="auth-buttons">
                        <button className="btn btn-primary" onClick={this.onSignIn}>Sign In</button>
                        &nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={this.onSignUp}>Sign Up</button>
                    </div>

                </div>
            </div>

        </div>;
    }
}



const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));