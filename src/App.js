import React, { useReducer } from 'react';
import './App.scss';
import posts from './data/posts';
import { Post } from './Component/Post/Post';

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
  let postIndex, post, commentIndex;
  const stateClone = clone(state);
  const { posts } = stateClone;
  switch(action.type) {
    case actionTypes.ADD_COMMENT:
      postIndex = stateClone.posts.findIndex((post) => post.id === action.postId);
      post = state.posts[postIndex]
      post.comments.push(
        { ...action.comment, id: post.length + 1 }
      ) 
      posts[postIndex] = post;
      return {
        ...state,
        posts,
      };
    case actionTypes.DELETE_COMMENT: 
      post = state.posts.find((post) => post.id === action.postId);
      commentIndex = post.comments.findIndex(
        comment => comment.id === action.commentId
      )
      return {
        ...state,
        posts:
          posts.slice(0, commentIndex)
            .concat(posts.slice(commentIndex + 1, posts.length))
      }
    case actionTypes.EDIT_COMMENT: 
      postIndex = state.posts.findIndex((post) => post.id === action.postId);
      commentIndex = post.comments.findIndex(
        comment => comment.id === action.commentId
      );
      posts[postIndex].comments[commentIndex] = {
        ...posts[postIndex].comments[commentIndex],
        text: action.comment
      };
      return {
        ...state,
        posts,
      };
    default: 
      return state;
  }
};

function App() {
  const [store, dispatch] = useReducer(reducer, initState, (initState) => initState);
  return (
    <div className="App">
      <h1 className="headline">ReactGram</h1>
      {store.posts.map(post => 
        <Post 
          key={post.code} 
          {...post} 
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default App;
