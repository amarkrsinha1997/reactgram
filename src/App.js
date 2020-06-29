import React, { useReducer } from 'react';
import './App.scss';
import posts from './data/posts';
import { Post } from './Component/Post/Post';
import { PostModel } from './Model/PostModel';


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
