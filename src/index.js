import ReactDOM from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import React from 'react';
// import { HashRouter } from 'react-router-dom';
import { startRouter, RouterStore } from 'mobx-router';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import App from './components/App';
// router
import views from './components/views';

import articlesStore from './stores/articlesStore';
import commentsStore from './stores/commentsStore';
import authStore from './stores/authStore';
import commonStore from './stores/commonStore';
import editorStore from './stores/editorStore';
import userStore from './stores/userStore';
import profileStore from './stores/profileStore';

const router = new RouterStore();

const stores = {
  articlesStore,
  commentsStore,
  authStore,
  commonStore,
  editorStore,
  userStore,
  profileStore,
  router,
  store: { router },
  match: router,
  location: router,
  views,
};
startRouter(views, stores);

// For easier debugging
window._____APP_STATE_____ = stores;

promiseFinally.shim();
useStrict(true);

ReactDOM.render((
  <Provider {...stores} >
    <App />
  </Provider>
), document.getElementById('root'));
