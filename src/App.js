import React, { useReducer } from 'react';
import './App.scss';
import posts from './data/posts';
import { Post } from './Component/Post/Post';

function PostModel(post) {
  let _post = post;
  this.addComment  = (comment) => {
    _post.comment.push(
      { ...comment, id: _post.comment.length + 1 }
    ) 
  }
  this.deleteComment = (commentId) => {
    const [,commentIndex] = this.findComment(commentId);
    _post.comment = _post.comment.slice(0, commentIndex)
      .concat(_post.comment.slice(commentIndex + 1, _post.comment.length))
  }
  this.updateComment = (commentId, message) => {
    const [comment ,commentIndex] = this.findComment(commentId);
    _post.comment[commentIndex] = {
      ...comment,
      text: message
    };
  }
  this.findComment = (commentId) => {
    const commentIndex = _post.comment.findIndex(comment => comment.id === commentId);
    return [_post.comment[commentIndex], commentIndex];
  }
  this.post = () => _post;
}
PostModel.count = 1
PostModel.findPost = (posts, id) => {
  const postIndex =  posts.findIndex((post) => post.id === id);
  return [posts[postIndex], postIndex]
}
PostModel.executeFor = (posts, postId, cb) => {
  const _posts = posts.slice();
  const [post, postIndex] = PostModel.findPost(posts, postId);
  cb(post);
  _posts[postIndex] = post;
  return _posts;
}
PostModel.addComment = (posts, postId, comment) => {
  return PostModel.executeFor(posts, postId, (post) => post.addComment(comment));
}

PostModel.removeComment = (posts, postId, commentId) => {
  return PostModel.executeFor(posts, postId, (post) => post.deleteComment(commentId));
}

PostModel.updateComment = (posts, postId, commentId, comment) => {
  return PostModel.executeFor(posts, postId, (post) => post.updateComment(commentId, comment));
}

const clone = (obj) => JSON.parse(JSON.stringify(obj));

const initState = {
  posts
};
const actionTypes = {
  ADD_COMMENT: "ADD_COMMENT",
  DELETE_COMMENT: "DELETE_COMMENT",
  EDIT_COMMENT: "EDIT_COMMENT"
}
const reducer = (state, action) => {
  const stateClone = clone(state);
  const { posts } = stateClone;
  const { postId, commentId, comment } = action.payload;
  switch(action.type) {
    case actionTypes.ADD_COMMENT:
      return {
        ...state,
        posts: PostModel.addComment(posts, postId, comment),
      };
    case actionTypes.DELETE_COMMENT: 
      return {
        ...state,
        posts: PostModel.removeComment(posts, postId, commentId),
      }
    case actionTypes.EDIT_COMMENT: 
      return {
        ...state,
        posts: PostModel.updateComment(posts, postId, commentId, comment),
      };
    default: 
      return state;
  }
};

function App() {
  const [store, dispatch] = useReducer(
    reducer, 
    initState, 
    (initState) => ({
      posts: initState.posts.map(post => new PostModel(post))
    })
  );
  return (
    <div className="App">
      <h1 className="headline">ReactGram</h1>
      {store.posts.map(post => 
        <Post 
          key={post.post().code} 
          {...post.post()} 
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default App;
