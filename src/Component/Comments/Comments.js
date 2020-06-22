import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Comments.scss';

const Comments = (props) => {
  return (
    <div className="comments" data-testid={props.code}>
      {props.comments.map((comment) => 
        <div className="comment" key={comment.id}>
          <span className="user">{comment.user}: </span>
          <span className="comment-message">
            {comment.text}
          </span>
        </div>
      )}
    </div>
  )
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
      PropTypes.shape({ 
        text: PropTypes.string.isRequired, 
        user: PropTypes.string.isRequired 
      })
    ),
  code: PropTypes.string.isRequired
}
Comments.defaultProps = {
  comments: []
}
export default Comments

