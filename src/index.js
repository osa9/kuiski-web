import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import registerServiceWorker from './registerServiceWorker';

import reducer from './reducer';

import './index.css';
import { DashBoard } from './components/DashBoard';
import { MobileBoard } from './components/MobileBoard';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const store = createStore(reducer, {}, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" exact component={MobileBoard} />
                <Route path="/dashboard" component={DashBoard} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
