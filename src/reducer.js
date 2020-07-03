import { PostModel } from "./Model/PostModel";

const actionTypes = {
  ADD_COMMENT: "ADD_COMMENT",
  DELETE_COMMENT: "DELETE_COMMENT",
  EDIT_COMMENT: "EDIT_COMMENT",
  LIKE_COMMENT: "LIKE_COMMENT"
}
const reducer = (state, action) => {
  const { posts } = state;
  const { postId, commentId, comment } = action.payload;
  switch (action.type) {
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
    case actionTypes.LIKE_COMMENT: 
      return {
        ...state,
        posts: PostModel.like(posts, postId)
      }
    default:
      return state;
  }
};

export { reducer, actionTypes}