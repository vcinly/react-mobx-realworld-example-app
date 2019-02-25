import DeleteButton from './DeleteButton';
import Link from '../Link';
import React from 'react';

const Comment = props => {
  const comment = props.comment;
  const show = props.currentUser &&
    props.currentUser.username === comment.author.username;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/@${comment.author.username}`}
          className="comment-author"
          params={{username: comment.author.username}}
        >
          <img src={comment.author.image} className="comment-author-img" alt="" />
        </Link>
        &nbsp;
        <Link
          to={`/@${comment.author.username}`}
          className="comment-author"
          params={{username: comment.author.username}}
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <DeleteButton
          show={show}
          slug={props.slug}
          commentId={comment.id}
          onDelete={props.onDelete}
        />
      </div>
    </div>
  );
};

export default Comment;
