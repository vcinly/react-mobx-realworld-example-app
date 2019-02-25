import React from "react";
// import { Route } from "mobx-router";
import Link from './Link';
import { inject, observer } from 'mobx-react';

function joinClassnames(...classnames) {
  return classnames.filter(i => i).join(" ");
}
  
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
@inject('location', 'match')
@observer
export class NavLink extends React.Component {
  render () {
    const {
      "aria-current": ariaCurrent = "page",
      activeClassName = "active",
      activeStyle,
      className: classNameProp,
      exact,
      isActive: isActiveProp,
      location,
      strict,
      style: styleProp,
      to,
      params,
      queryParams,
      ...rest
    } = this.props

    // const path = typeof to === "object" ? to.pathname : to;
  
    // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
    // const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

    const isActive = !!(isActiveProp
      ? isActiveProp(this.props.match, this.props.location)
      : this.props.match);

    const className = isActive
      ? joinClassnames(classNameProp, activeClassName)
      : classNameProp;
    const style = isActive ? { ...styleProp, ...activeStyle } : styleProp;
  
    return (
      <Link
        aria-current={(isActive && ariaCurrent) || null}
        className={className}
        style={style}
        to={to}
        queryParams={queryParams}
        params={params}
        {...rest}
      />
    );
  }
}