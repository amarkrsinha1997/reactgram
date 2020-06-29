import { PostModel } from './PostModel';
import { ValidationError } from '../Execptions/validation-error';
import { NotFoundError } from '../Execptions/not-found';

describe('PostModel', () => {
  let posts;
  beforeEach(() => {
    posts = [
      new PostModel({
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
      }),
      new PostModel({
        "code": "_A2r0aQcfD",
        "caption": "Some caption",
        "likes": 57,
        "id": "1135147611821557698",
        "display_src": "12276809_750065668431999_184252508_n.jpg",
        "comment": [
          {
            "text": "Uhu!",
            "user": "lucascaixeta",
            "id": 1
          }
        ]
      }),
    ]
  })

  it('should be able to add comment', () => {
    const newComment = {
      "text": "Uhu!",
    }
    const post = posts[0];
    PostModel.addComment(posts, post.id(), newComment)
    expect(post.comment()[1]).toStrictEqual({
      ...newComment, "user": "You", id: 2
    })
  });
  it('should be able to edit comment', () => {
    const newComment = {
      "text": "Uhu!",
    }
    const post = posts[0];
    PostModel.addComment(posts, post.id(), newComment);
    const updatedComment = {
      ...newComment, "user": "You", "text": "Uhum!"
    }
    PostModel.updateComment(posts, post.id(), post.comment()[1].id, updatedComment.text)
    expect(post.comment()[1]).toStrictEqual({
      ...updatedComment, id: 2
    })
  });
  it('should be able to delete comment', () => {
    const post = posts[0];
    const comment = post.comment()[0];
    PostModel.removeComment(posts, post.id(), comment.id)
    expect(post.comment()).toStrictEqual([])
  });
  it('should be able to add comment user name in post model if provided.', () => {
    const newComment = {
      "text": "Uhu!",
      "user": "AMar"
    }
    const post = posts[0];
    PostModel.addComment(posts, post.id(), newComment)
    expect(post.comment()[1]).toStrictEqual({
      ...newComment, id: 2
    })
  });
  it('should validate comment when added as yours', () => {
    const newComment = {
      "texts": "Uhu!"
    }
    const post = posts[0];

    const action = () => PostModel.addComment(posts, post.id(), newComment);

    expect(action).toThrowErrorMatchingSnapshot()
    expect(action).toThrowError(ValidationError);
  });
  it('should validate comment when edited.', () => {
    const post = posts[0];

    const action = () => PostModel.updateComment(
      posts,
      post.id(),
      post.comment()[0].id
    )

    expect(action).toThrowErrorMatchingSnapshot()
    expect(action).toThrowError(ValidationError);
  });

  it('should throw error when comment is not found', () => {
    const postId = posts[0].id();
    const commentId = 1223;

    const action = () => PostModel.removeComment(posts, postId, commentId)

    expect(action).toThrowError(NotFoundError);
    expect(action).toThrowErrorMatchingSnapshot();
  });
  it('should throw error when post is not found', () => {
    const postId = '44343232232321';
    
    const action = () => PostModel.findPost(posts, postId);

    expect(action).toThrowError(NotFoundError);
    expect(action).toThrowErrorMatchingSnapshot();
  });

  it('should be able to find the comment', () => {
    const index = 0;
    const post = posts[index];
    const comment = post.comment()[index]
    const result = post.findComment(comment.id);
    expect(result).toStrictEqual(
      [comment, index]
    );
  });
  it('should be able to find the post', () => {
    const index = 0;
    const post = posts[index];
    expect(PostModel.findPost(posts, post.id())).toStrictEqual([posts[index], index]);
  });
});