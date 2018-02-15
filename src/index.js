import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import registerServiceWorker from './registerServiceWorker';

import reducer from './reducer';

import './index.css';
//import App from './App';
import { DashBoard } from './components/DashBoard';


const store = createStore(reducer, {}, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <DashBoard />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
