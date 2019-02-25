import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
import { Route } from 'mobx-router';
import { inject, observer } from 'mobx-react';
import Home from './Home';

@inject('userStore', 'commonStore')
@observer
export default class PrivateRoute extends React.Component {
  render() {
    const { userStore, ...restProps } = this.props;
    if (userStore.currentUser) return <Route {...restProps} />;
    return <Route to="/" component={<Home/>} />;
  }
}
