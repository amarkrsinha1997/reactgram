import { ValidationError } from '../Execptions/validation-error';
import { NotFoundError } from '../Execptions/not-found';
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
  const validateCommentOrThrow = (comment) => {
    if(typeof comment === 'object' && !comment.text) {
      throw new ValidationError('No `comment.text` found in ' + JSON.stringify(comment))
    } else if(!comment) {
      throw new ValidationError('Comment can\'t be empty.')
    }
  };
  this.addComment = (comment) => {
    validateCommentOrThrow(comment)
    _post.comment.push(
      { text: comment.text, user: comment.user ||  'You', id: _post.comment.length + 1 }
    )
  }
  this.deleteComment = (commentId) => {
    const [, commentIndex] = this.findComment(commentId);
    _post.comment = _post.comment.slice(0, commentIndex)
      .concat(_post.comment.slice(commentIndex + 1, _post.comment.length))
  }
  this.updateComment = (commentId, message) => {
    validateCommentOrThrow(message);
    const [comment, commentIndex] = this.findComment(commentId);
    _post.comment[commentIndex] = {
      ...comment,
      text: message
    };
  }
  this.findComment = (commentId) => {
    const commentIndex = _post.comment.findIndex(
      comment => comment.id === commentId
    );
    
    if(commentIndex < 0){
      const message = `No comment for the Id: ${commentId} and postId: ${this.id()}`; 
      throw new NotFoundError(message)
    }
    
    return [_post.comment[commentIndex], commentIndex];
  }
  this.comment = () => _post.comment || [];
  this.post = () => _post;
  this.id = () => _post.id;
}
PostModel.count = 1
PostModel.findPost = (posts, id) => {
  const postIndex = posts.findIndex((post) => post.id() === id);
  if(postIndex < 0) {
    throw new NotFoundError('No post found for Id: ' + id)
  }
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

PostModel.updateComment = (posts, postId, commentId, commentMessage) => {
  return PostModel.executeFor(posts, postId, (post) => post.updateComment(commentId, commentMessage));
}

export {PostModel}