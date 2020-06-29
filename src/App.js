import React, { useReducer } from 'react';
import './App.scss';
import posts from './data/posts';
import { Post } from './Component/Post/Post';
import { PostModel } from './Model/PostModel';
import { reducer } from './reducer';


// const clone = (obj) => JSON.parse(JSON.stringify(obj));

const initState = {
  posts
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
          key={post.id()} 
          {...post.post()} 
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default App;
