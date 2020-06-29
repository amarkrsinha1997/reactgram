function PostModel(post) {
  /**
   *  
    post {
      "code": "_A2r0aQcfD",
      "caption": "Some caption",
      "likes": 57,
      "id": "1135147611821557699",
      "display_src": "12276809_750065668431999_184252508_n.jpg",
      "comment": [
        {
          "text": "Uhu!",
          "user": "lucascaixeta",
          "id": 1
        }
      ]
    }
   */
  let _post = post;
  this.addComment = (comment) => {
    _post.comment.push(
      { ...comment, id: _post.comment.length + 1 }
    )
  }
  // this.deleteComment = (commentId) => {
  //   const [, commentIndex] = this.findComment(commentId);
  //   _post.comment = _post.comment.slice(0, commentIndex)
  //     .concat(_post.comment.slice(commentIndex + 1, _post.comment.length))
  // }
  // this.updateComment = (commentId, message) => {
  //   const [comment, commentIndex] = this.findComment(commentId);
  //   _post.comment[commentIndex] = {
  //     ...comment,
  //     text: message
  //   };
  // }
  this.findComment = (commentId) => {
    const commentIndex = _post.comment.findIndex(comment => comment.id === commentId);
    return [_post.comment[commentIndex], commentIndex];
  }
  this.post = () => _post;
  this.id = () => _post.id;
}
PostModel.count = 1
PostModel.findPost = (posts, id) => {
  const postIndex = posts.findIndex((post) => post.id() === id);
  // if(postIndex < 0) {
  //   throw new Error()
  // }
  return [posts[postIndex], postIndex]
}
// PostModel.executeFor = (posts, postId, cb) => {
//   const _posts = posts.slice();
//   const [post, postIndex] = PostModel.findPost(posts, postId);
//   cb(post);
//   _posts[postIndex] = post;
//   return _posts;
// }
// PostModel.addComment = (posts, postId, comment) => {
//   return PostModel.executeFor(posts, postId, (post) => post.addComment(comment));
// }

// PostModel.removeComment = (posts, postId, commentId) => {
//   return PostModel.executeFor(posts, postId, (post) => post.deleteComment(commentId));
// }

// PostModel.updateComment = (posts, postId, commentId, comment) => {
//   return PostModel.executeFor(posts, postId, (post) => post.updateComment(commentId, comment));
// }

export {PostModel}