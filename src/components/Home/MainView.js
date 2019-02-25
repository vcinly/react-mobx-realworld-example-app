import ArticleList from '../ArticleList';
import React from 'react';
import { inject, observer } from 'mobx-react';
// import { withRouter, NavLink } from 'react-router-dom'
// import { parse as qsParse } from 'query-string';
import { NavLink } from '../NavLink'

const YourFeedTab = props => {
  if (props.currentUser) {

    return (
      <li className="nav-item">
      <NavLink
          className="nav-link"
          isActive={
            (match, location) => {
              return location.queryParams && location.queryParams.tab && location.queryParams.tab.match("feed") ? 1 : 0;
            }
          }
          to="/"
          queryParams={{tab:'feed'}}
        >
          Your Feed
        </NavLink>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  return (
    <li className="nav-item">
      <NavLink
        className="nav-link"
        isActive={
          (match, location) => {
            return !(location.queryParams && location.queryParams.tab && location.queryParams.tab.match(/(feed|tag)/)) ? 1 : 0;
          }
        }
        to="/"
        queryParams={{tab:'all'}}
      >
        Global Feed
      </NavLink>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound" /> {props.tag}
      </a>
    </li>
  );
};

@inject('articlesStore', 'commonStore', 'userStore', 'location', 'match', 'views')
// @withRouter
@observer
export default class MainView extends React.Component {

  componentWillMount() {
    this.props.articlesStore.setPredicate(this.getPredicate());
    this.props.views.home.onParamsChange = () => {this.getData(this.props)};
  }

  componentDidMount() {
    this.props.articlesStore.loadArticles();
  }

  componentDidUpdate(previousProps) {
    if (
      this.getTab(this.props) !== this.getTab(previousProps) ||
      this.getTag(this.props) !== this.getTag(previousProps)
    ) {
      this.props.articlesStore.setPredicate(this.getPredicate());
      this.props.articlesStore.loadArticles();
    }
  }

  getData(props = this.props) {
    props.articlesStore.setPredicate(this.getPredicate());
    props.articlesStore.loadArticles();
  }

  getTag(props = this.props) {
    return (props.location.queryParams || {}).tag || "";
  }

  getTab(props = this.props) {
    return (props.location.queryParams || {}).tab || 'all';
  }

  getPredicate(props = this.props) {
    switch (this.getTab(props)) {
      case 'feed': return { myFeed: true };
      case 'tag': return { tag: (props.location.queryParams || {}).tag };
      default: return {};
    }
  }

  handleTabChange = (tab) => {
    if (this.props.location.queryParams && this.props.location.queryParams.tab === tab) return;
    this.props.router.push({ ...this.props.location, queryParams: { tab } })
  };

  handleSetPage = page => {
    this.props.articlesStore.setPage(page);
    this.props.articlesStore.loadArticles();
  };

  render() {
    const { currentUser } = this.props.userStore;
    const { articles, isLoading, page, totalPagesCount } = this.props.articlesStore;

    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">

            <YourFeedTab
              currentUser={currentUser}
              tab={this.getTab()}
            />

            <GlobalFeedTab
              tab={this.getTab()}
            />

            <TagFilterTab tag={(this.props.location.queryParams || {}).tag} />

          </ul>
        </div>

        <ArticleList
          articles={articles}
          loading={isLoading}
          totalPagesCount={totalPagesCount}
          currentPage={page}
          onSetPage={this.handleSetPage}
        />
      </div>
    );
  }
};
