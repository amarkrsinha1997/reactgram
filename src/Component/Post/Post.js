import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Image } from '../Base/Image/Image'
import { Tabs } from "../Base/Tabs/Tabs"
import './Post.scss';
import Comments from '../Comments/Comments';
import { actionTypes } from '../../reducer';

// TODO: Add input box add comments.

const Post = props => {
  const [shouldShowComments, setShouldShowComments] = useState(false);
  const toggleComment = () => setShouldShowComments((prevState) => !prevState);
  return (
    <div className="post">
      <div className="post-image">
        <Image imageName={props.display_src} alt={props.display_src} />
      </div>
      <Tabs>
        <Tabs.Button>
          Like
        </Tabs.Button>
        <Tabs.Button onClick={toggleComment}>
          Comments {props.comment.length !== 0 && `(${props.comment.length})`}
        </Tabs.Button>
      </Tabs>
      {
        shouldShowComments && 
        <Comments 
          dispatch={props.dispatch} 
          postId={props.id} 
          comments={props.comment} 
          code={props.code} />
      }
    </div>
  )
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  display_src: PropTypes.string.isRequired,
  comment: Comments.propTypes.comments,
  dispatch: PropTypes.func.isRequired
}
Post.defaultProps = {
  comment: []
}
export { Post }
