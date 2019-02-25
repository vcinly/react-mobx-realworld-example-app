import React from 'react';
import { Route } from 'mobx-router';
import Loadable from 'react-loadable';
import LoadingComponent from './Loading';

// components
import Article from './Article';
import Editor from './Editor';
import Home from './Home';
// import Login from './Login';
import Profile from './Profile';
// import Register from './Register';
import Settings from './Settings';

// https://facebook.github.io/create-react-app/docs/code-splitting
const AsyncLogin = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ './Login'),
  loading: LoadingComponent
});

const AsyncRegister = Loadable({
  loader: () => import(/* webpackChunkName: "register" */ './Register'),
  loading: LoadingComponent
});

const views = {
    home: new Route({
      path: '/',
      component: <Home/>,
      // onParamsChange: (route, params, store, queryParams) => {
      //   console.log('queryParams changed to', queryParams);
      // }
    }),
    login: new Route({
      path: '/login',
      component: <AsyncLogin/>
    }),
    register: new Route({
      path: '/register',
      component: <AsyncRegister/>
    }),
    editor: new Route({
      path: '/editor/:slug',
      component: <Editor/>
    }),
    article: new Route({
      path: '/article/:id',
      component: <Article/>
    }),
    settings: new Route({
      path: '/settings',
      component: <Settings/>
    }),

    // https://github.com/kitze/mobx-router/blob/master/src/regex.js
    // mobx-router paramRegex match '/:' prefix only
    profile: new Route({
      path: '/:username',
      component: <Profile/>,
    }),
    favorites: new Route({
      path: '/:username/favorites',
      component: <Profile/>,
    }),
};
export default views;