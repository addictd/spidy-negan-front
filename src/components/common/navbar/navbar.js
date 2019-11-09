import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="#">Navbar</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">

                                    {this.state.navItems.map((val, i) => {
                                        return <li className="nav-item active" key={val.name + i}>
                                            <Link className="nav-link" to={val.route}>
                                                {val.name}
                                            </Link>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </nav>
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