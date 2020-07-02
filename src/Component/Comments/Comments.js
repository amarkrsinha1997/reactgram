import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Comments.scss';
import { commentPropTypes } from '../../reusablePropType';
import { actionTypes } from '../../reducer';

const editIcon = "https://img.icons8.com/cute-clipart/30/000000/edit.png"
const cancelIcon = "https://img.icons8.com/cute-clipart/30/000000/cancel.png";

const Comment = (props) => {
  const { comment, handleChange } = props;
  const [commentInput, setCommentInput] = useState(comment.text);
  const [editable, setEditable] = useState(false);

  const handleIconClick = () => setEditable((prevEditable) => !prevEditable);

  const handleCommentEdit = async (event) => {
    const { value: updatedCommentMessage } = event.target;
    setCommentInput(updatedCommentMessage);
  }

  const handleSubmit = async event => {
    if(event.key === 'Enter') {
      await handleChange(comment.id, commentInput);
      handleIconClick();
    }
  }
  
  return (
    <React.Fragment>
      <div className="comment">
        <span className="user">{comment.user}: </span>
        {
          !editable ?
            <span className="comment-message">
              {commentInput}
            </span> :
            <input 
              data-testid="edit-input"
              type="text" 
              onChange={handleCommentEdit}
              onKeyDown={handleSubmit} 
              name="edit-comment" 
              className="input-box" 
              value={commentInput} 
              />
        }
        {
          !editable ?
            <img
              src={editIcon}
              alt="edit-icon"
              className="icon"
              onClick={handleIconClick} /> :
            <img
              src={cancelIcon}
              alt="cancel-edit-icon"
              className="icon"
              onClick={handleIconClick} />
        }
      </div>
    </React.Fragment>
  )
}

Comment.propTypes = {
  comment: commentPropTypes,
  handleChange: PropTypes.func.isRequired,
}

const Comments = (props) => {
  const { postId, code, comments, dispatch } = props;

  const handleChange = (postId) => async (commentId, comment) => {
    await dispatch({
      type: actionTypes.EDIT_COMMENT,
      payload: { postId, commentId, comment }
    });
  }


  return (
    <div className="comments" data-testid={code}>
      {comments.map((comment) =>
        <Comment key={code + comment.id} comment={comment} handleChange={handleChange(postId)} />
      )}
    </div>
  )
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(commentPropTypes),
  dispatch: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
}
Comments.defaultProps = {
  comments: []
}
export default Comments

