import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Image } from '../Base/Image/Image'
import { Tabs } from "../Base/Tabs/Tabs"
import './Post.scss';
import Comments from '../Comments/Comments';

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
          Comments
        </Tabs.Button>
      </Tabs>
      {shouldShowComments && <Comments comments={props.comment} code={props.code} />}
    </div>
  )
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  display_src: PropTypes.string.isRequired,
  comment: Comments.propTypes.comment
}
Post.defaultProps = {
  comment: []
}
export { Post }
//{props.comment.length !== 0 && `(${props.comment.length})`}