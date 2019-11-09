import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './App.css';
import rootReducer from './root-reducer';
import Routes from './components/routes';
import Navbar from './components/common/navbar/navbar';

export const history = createBrowserHistory();

const configureStore = () => {
  return createStore(
    rootReducer(history),
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )

    )
  )
}

class App extends Component {

  render() {
    const newStore = configureStore();
    return (
      <Provider store={newStore}>

        <ConnectedRouter history={history}>

          <div className="App">
            <div>
              
              <Navbar >
                <Routes store={newStore}/>
              </Navbar>

            </div>
          </div>

        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

