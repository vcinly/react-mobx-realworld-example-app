import React from 'react';
import Link from '../Link';
import LoadingSpinner from '../LoadingSpinner';

const Tags = props => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map(tag => {

            return (
              <Link
                to="/"
                className="tag-default tag-pill"
                key={tag}
                queryParams={{tab: 'tag', tag: tag}}
              >
                {tag}
              </Link>
            );
          })
        }
      </div>
    );
  } else {
    return (
      <LoadingSpinner />
    );
  }
};

export default Tags;
