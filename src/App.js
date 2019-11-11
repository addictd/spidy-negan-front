import { ConnectedRouter } from 'connected-react-router';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Navbar from './components/common/navbar/navbar';
import Routes from './components/routes';
import './socketHandler'; //for handling socket connections

import {history, store} from './store';

class App extends Component {


  render() {
    
    return (
      <Provider store={store}>

        <ConnectedRouter history={history}>

          <div className="App">
            <div>

              <Navbar >
                <Routes store={store} />
              </Navbar>

            </div>
          </div>

        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

