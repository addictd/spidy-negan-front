import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../../public/images/logo.png';
import { ls_get } from '../../services/ls-service';
import config from '../../../../config';

class Navbar extends Component {
    constructor(props) {

        super(props);
        this.state = {
            navItems: []
        }

    }
    componentDidMount() {
        this.setState({
            navItems: [
                { 'name': 'Home', 'route': '/home' },
                { 'name': 'Sign In', 'route': '/signin' },
                { 'name': 'Sign Out', 'route': '/signout' }
            ]
        })
    }

    render() {
        return (
            <div>
                <div>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable={false}
                        pauseOnHover
                        transition={Flip}
                    />
                </div>
                <div>
                    <div>
                        <ul className="nav" id="nav">
                            <li className="nav-item logo" >
                                <Link className="nav-link" to='/home'>
                                    <img 
                                    src={logo} 
                                    id="logo-identifier" 
                                    />
                                </Link>

                            </li>
                            <li className="nav-item logo-name" >
                                <Link className="nav-link" to='/home'>
                                    <h4 id="logo-desc" >Spidy - Negan</h4>
                                </Link>

                            </li>
                            {
                                ls_get(!config.TOKEN)
                                    ? <li className="nav-item">
                                        <Link className="nav-link" to='/signin'>Sign In</Link>
                                    </li>
                                    : <li className="nav-item">
                                        <Link className="nav-link" to='/signout'>
                                            <i className="fa fa-sign-out" aria-hidden="true" ></i>
                                        </Link>
                                    </li>
                            }

                        </ul>



                    </div>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Navbar;