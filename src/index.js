import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux'
import reducer from './reducers'
import middleware from './middlewares'
import { Provider } from 'react-redux'
import ConnectedApp from '../src/components/App'

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
