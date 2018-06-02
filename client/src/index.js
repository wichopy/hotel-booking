import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react'
import mockHTTP from './mocks/mockHTTP'

import RootStore from './stores/RootStore'
// Temporarily stub network requests.
const rootStore = new RootStore(mockHTTP)

window['stores'] = rootStore

ReactDOM.render(
  <Provider RootStore={rootStore}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
