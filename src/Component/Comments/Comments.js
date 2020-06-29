import React, { useState } from 'react';
import PropTypes from 'prop-types';
import editIcon from '../../Icons/editIcon.svg';
import './Comments.scss';
const cancelIcon = "https://img.icons8.com/cute-clipart/20/000000/cancel.png";

const Comments = (props) => {
  const [editable, setEditable] = useState(false);
  const handleIconClick = () => setEditable((prevEditable) => !prevEditable);

  return (
    <div className="comments" data-testid={props.code}>
      {props.comments.map((comment) =>
        <React.Fragment key={comment.id}>
          <div className="comment">
            <span className="user">{comment.user}: </span>
            {
              !editable ?
                <span className="comment-message">
                  {comment.text}
                </span> :
                <input type="text" />
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
  dispatch: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
}
Comments.defaultProps = {
  comments: []
}
export default Comments

