import React from "react";
import { Link as MobxLink } from "mobx-router";
import { inject, observer } from 'mobx-react';
import views from './views';

@inject('router')
@observer
export default class Link extends React.Component {
  view(to) {
      if (to === '/') { return views.home }
      if (to.match('@')) {
        if (to.match('favorites')) { return views.favorites } else { return views.profile }
      }
      return views[to.match(/\w+/)[0]]
  }

  render() {
    const { route, to, params } = this.props;
    return (
      <MobxLink {...this.props} route={route} view={this.view(to)} params={params} />
    );
  }
}