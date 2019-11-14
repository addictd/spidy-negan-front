import { ConnectedRouter } from 'connected-react-router';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import Navbar from './components/common/navbar/navbar';
import Routes from './components/routes';
import './socketHandler'; //for handling socket connections
import Index from './components/index';
import {history, store} from './store';

class App extends Component {


  render() {
    
    return (
      <Provider store={store}>

        <ConnectedRouter history={history}>

          <div className="App">
            <div>
              <Index store={store} />
            </div>
          </div>

        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

