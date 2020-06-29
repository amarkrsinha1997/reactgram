import { PostModel } from './PostModel';

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
  xit('should be able to add comment', () => {
    const comment = {
      "text": "Uhu!",
      "user": "lucascaixe"
    }
    const post = posts[0];
    PostModel.addComment(posts, post.post().id, comment)
    expect(posts[0].post().comment[1]).toStrictEqual({...comment, id: 2})
  });
  xit('should be able to edit comment', () => {
    const comment = {
      "text": "Uhu!",
      "user": "lucascaixe"
    }
    const post = posts[0];
    PostModel.addComment(posts, post.id, comment);

    // PostModel.updateComment(posts, posts)
  });
  it('should be able to delete comment', () => {});
  it('should validate comment when added', () => {});
  it('should validate comment when edited.', ()=> {});

  it('should throw error if id is not found to delete the post.', () => {});
  it('should throw error when comment is not found', () => {});
  it('should throw error when post is not found', () => {});

  it('should be able to find the comment', () => {});
  it('should be able to find the post', () => {
    const index = 0;
    expect(PostModel.findPost(posts, posts[index].id())).toStrictEqual([posts[index], index]);
  });
});