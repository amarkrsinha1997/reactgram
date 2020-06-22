import React from 'react'
import PropTypes from 'prop-types'
import { Image } from '../Base/Image/Image'
import { Tabs } from "../Base/Tabs/Tabs"
import './Post.scss';

const Post = props => {
  return (
    <div className="post">
      <div className="post-image">
        <Image imageName={props.display_src} alt={props.display_src} />
      </div>
      <Tabs>
        <Tabs.Tab>
          Like
        </Tabs.Tab>
        <Tabs.Tab>
          Comments
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

Post.propTypes = {

}

export { Post }
